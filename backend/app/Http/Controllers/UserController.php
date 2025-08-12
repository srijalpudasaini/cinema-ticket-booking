<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(){
        $users = User::orderBy('created_at','DESC')->get();
        return response()->json([
            'status'=>true,
            'users'=>$users,
        ],200);
    }

    public function show($id){
        $user = User::find($id);

        if(!$user){
            return response()->json([
                'status'=>false,
                'message'=>'User not found',
            ],404);
        }

        return response()->json([
            'status'=> true,
            'user'=>$user
        ]);

    }

    public function store(Request $request){
        $request->validate([
            'name'=>'required',
            'phone'=>'required|unique:users,phone',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|confirmed',
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();

        return response()->json([
            'message'=>'User created successfully',
        ],200);
    }

    public function update(Request $request, $id){
        $request->validate([
            'name'=>'required',
            'phone' => 'required|unique:users,phone,' . $id,
            'email' => 'required|email|unique:users,email,' . $id,
            'password'=>'required',
        ]);

        $user = User::find($id);

        if(!$user){
            return response()->json([
                'status'=>false,
                'message'=>'User not found',
            ],404);
        }
        $user->name = $request->name;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();

        return response()->json([
            'status'=>true,
            'message'=>'User updated successfully',
        ],200);        
    }

    public function delete($id){
        $user = User::find($id);
        
        if(!$user){
            return response()->json([
                'status'=>false,
                'message'=>'User not found',
            ],404);
        }

        $user->delete();

        return response()->json([
            'message'=>'User deleted successfully',
             'users'=> User::orderBy('created_at','DESC')->get()
        ],200); 
    }
}
