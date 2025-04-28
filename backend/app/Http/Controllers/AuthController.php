<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'phone'=>'required|unique:users,phone',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        $user = new User();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->password = Hash::make($request->password);
        $user->role = 'user';
        
        $user->save();

        $token = $user->createToken($request->name);

        return response()->json([
            'status'=>true,
            'message'=>'User registered successfully',
            'token'=>$token->plainTextToken
        ],200);
    }
    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);

        $user = User::where('email',$request->email)->first();

        if(!$user || !Hash::check($request->password,$user->password)){
            return response()->json([
                'status'=>false,
                'message'=>'Invalid credentials'
            ],404);
        }

        $token = $user->createToken($user->name);

        return response()->json([
            'status'=>true,
            'message'=>'Login successful',
            'user'=>$user,
            'token'=>$token->plainTextToken
        ],200);
    }
    public function logout(Request $request) {
        $request->user()->tokens()->delete();

        return response()->json([
            'status'=>true,
            'message'=>'Logout successful'
        ]);
    }

    public function updateProfile(Request $request){
        $user = $request->user();
        $request->validate([
            'name'=>'required',
            'email'=>'email|required|unique:users,email,'.$user->id,
            'phone'=>'required|unique:users,phone,'.$user->id
        ]);

        // $user = User::findOrFail($request->user()->id);


        $user->email = $request->email;
        $user->name = $request->name;
        $user->phone = $request->phone;

        $user->save();

        return response()->json([
            'status'=>true,
            'message'=>'Profile updated successfully'
        ]);
    }

    public function changePassword(Request $request){
        $request->validate([
            'old_password'=>'required',
            'password'=>'required|confirmed'
        ]);

        $user = $request->user();

        if(!Hash::check($request->old_password,$user->password)){
            return response()->json([
                'status'=>false,
                'message'=>'Old password does not match'
            ],404);
        }

        $user->password = Hash::make($request->password);

        return response()->json([
            'status'=>false,
            'message'=>'Password changed successfully!'
        ]);
    }
}
