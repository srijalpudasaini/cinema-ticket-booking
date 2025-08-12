<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Seat;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    public function index(Request $request){
        $inactive = $request->boolean('inactive');
        $genres = Genre::when(!$inactive, function ($query) {
                    $query->where('status', true);
                })
                ->orderByDesc('created_at')
                ->get();
        return response()->json([
            'status'=>true,
            'genres'=>$genres,
        ],200);
    }

    public function show($id){
        $genre = Genre::find($id);

        if(!$genre){
            return response()->json([
                'status'=>false,
                'message'=>'Genre not found'
            ],404);
        }
        return response()->json([
            'status'=>true,
            'genre'=>$genre
        ],200);
    }

    public function store(Request $request){
        $request->validate([
            'name'=>'required',
            'status'=>'required|boolean'
        ]);

        $genre = new Genre();

        $genre->name = $request->name;
        $genre->status = $request->status;

        $genre->save();

        return response()->json([
            'status'=>true,
            'message'=>'Genre created successfully',
        ],200);
    }

    public function update(Request $request, $id){
        $request->validate([
            'name'=>'required',
            'status'=>'required|boolean'
        ]);

        $genre = Genre::find($id);

        if(!$genre){
            return response()->json([
                'status'=>false,
                'message'=>'Genre not found',
            ],404);
        }
        $genre->name = $request->name;
        $genre->status = $request->status;
        
        $genre->save();

        return response()->json([
            'status'=>true,
            'message'=>'Genre updated successfully',
        ],200);        
    }

    public function delete($id){
        $genre = Genre::find($id);
        
        if(!$genre){
            return response()->json([
                'status'=>false,
                'message'=>'Genre not found',
            ],404);
        }

        $genre->delete();

        return response()->json([
            'message'=>'Genre deleted successfully',
            'genres'=> Genre::orderBy('created_at','DESC')->where('status',true)->get()
        ],200); 
    }
}
