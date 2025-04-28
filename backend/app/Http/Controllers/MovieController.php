<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MovieController extends Controller
{
    public function index(Request $request){
        if($request->has('status')){
            $movies = Movie::where('status',$request->status)->get();
            return response()->json([
                'status'=>true,
                'movies'=>$movies,
            ],200);
        }
        $movies = Movie::orderBy('created_at','DESC')->get();

        return response()->json([
            'status'=>true,
            'movies'=>$movies,
        ],200);

        // return view('movies',compact('movies'));
    }

    public function show($id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json([
                'status' => false,
                'message' => 'Movie not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'movie' => $movie
        ], 200);
    }

    public function showBySlug($slug)
    {
        $movie = Movie::where('slug',$slug)->first();

        if (!$movie) {
            return response()->json([
                'status' => false,
                'message' => 'Movie not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'movie' => $movie
        ], 200);
    }

    public function store(Request $request){
        $request->validate([
            'name'=>'required',
            'slug'=>'unique:movies,slug',
            'subtitle'=>'nullable',
            'cover'=>'required|mimes:jpg,jpeg,png',
            'thumbnail'=>'required|mimes:jpg,jpeg,png',
            'trailer'=>'required',
            'rating'=>'required|numeric',
            'release_date'=>'required',
            'runtime'=>'required',
            'director'=>'required',
            'genre'=>'required',
            'status'=>'required|in:upcoming,ongoing,previous',
        ]);

        $movie = new Movie();
        $movie->name = $request->name;
        $movie->slug = Str::slug($request->name." ".$request->subtitle);
        $movie->subtitle = $request->subtitle;
        $movie->thumbnail = $request->thumbnail;
        $movie->trailer = $request->trailer;
        $movie->rating = $request->rating;
        $movie->release_date = $request->release_date;
        $movie->runtime = $request->runtime;
        $movie->director = $request->director;
        $movie->genre = $request->genre;
        $movie->status = $request->status;

        $image = $request->file('cover');
        $image_name = Carbon::now()->timestamp . '.' . $image->extension();
        $movie->cover = $image_name;
        $image->move(public_path('uploads/movies/cover/'), $image_name);

        $thumb = $request->file('thumbnail');
        $thumb_name = Carbon::now()->timestamp . '.' . $thumb->extension();
        $movie->thumbnail = $thumb_name;
        $thumb->move(public_path('uploads/movies/thumbnail/'), $thumb_name);

        $movie->save();

        return response()->json([
            'status'=>true,
            'message'=>'Movie added successfully',
        ],200);
    }

    public function update(Request $request, $id){
        $request->validate([
            'name'=>'required',
            'subtitle'=>'nullable',
            'cover'=>'nullable|mimes:jpg,jpeg,png',
            'thumbnail'=>'nullable|mimes:jpg,jpeg,png',
            'trailer'=>'required',
            'rating'=>'required|numeric',
            'release_date'=>'required',
            'runtime'=>'required',
            'director'=>'required',
            'genre'=>'required',
            'status'=>'required|in:upcoming,ongoing,previous',
        ]);

        $movie = Movie::find($id);

        if(!$movie){
            return response()->json([
                'status'=>false,
                'message'=>'Movie not found',
            ],404);
        }
        $movie->name = $request->name;
        $movie->slug = Str::slug($request->name);
        if($request->subtitle){
            $movie->subtitle = $request->subtitle;
        }
        $movie->trailer = $request->trailer;
        $movie->rating = $request->rating;
        $movie->release_date = $request->release_date;
        $movie->runtime = $request->runtime;
        $movie->director = $request->director;
        $movie->genre = $request->genre;
        $movie->status = $request->status;

        if($request->hasFile('cover')){
            if(File::exists(public_path('uploads/movies/cover/'.$movie->cover))){
                File::delete(public_path('uploads/movies/cover/'.$movie->cover));
            }
            $image = $request->file('cover');
            $image_name = Carbon::now()->timestamp . '.' . $image->extension();
            $movie->cover = $image_name;
            $image->move(public_path('uploads/movies/cover/'), $image_name);
        }
        if($request->hasFile('thumbnail')){
            if(File::exists(public_path('uploads/movies/thumbnail/'.$movie->thumbnail))){
                File::delete(public_path('uploads/movies/thumbnail/'.$movie->thumbnail));
            }

            $image = $request->file('thumbnail');
            $image_name = Carbon::now()->timestamp . '.' . $image->extension();
            $movie->thumbnail = $image_name;
            $image->move(public_path('uploads/movies/thumbnail/'), $image_name);
        }

        $movie->save();

        return response()->json([
            'status'=>true,
            'message'=>'Movie updated successfully',
        ],200);        
    }

    public function delete($id){
        $movie = Movie::find($id);
        
        if(!$movie){
            return response()->json([
                'status'=>false,
                'message'=>'Movie not found',
            ],404);
        }

        if(File::exists(public_path('uploads/movies/'.$movie->cover))){
            File::delete(public_path('uploads/movies/'.$movie->cover));
        }
        if(File::exists(public_path('uploads/movies/'.$movie->thumbnail))){
            File::delete(public_path('uploads/movies/'.$movie->thumbnail));
        }

        $movie->delete();

        return response()->json([
            'message'=>'Movie deleted successfully',
        ],200); 
    }
}
