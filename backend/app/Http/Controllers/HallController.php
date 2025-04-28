<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Seat;
use Illuminate\Http\Request;

class HallController extends Controller
{
    public function index(){
        $halls = Hall::orderBy('created_at','DESC')->get();
        return response()->json([
            'status'=>true,
            'halls'=>$halls,
        ],200);
    }

    public function show($id){
        $hall = Hall::find($id);

        if(!$hall){
            return response()->json([
                'status'=>false,
                'message'=>'Hall not found'
            ],404);
        }
        $seat = Seat::where('hall_id',$id)->first();
        return response()->json([
            'status'=>true,
            'hall'=>$hall,
            'price'=>$seat->price,
        ],200);
    }

    public function store(Request $request){
        $request->validate([
            'name'=>'required',
            'rows'=>'required|numeric|min:0|max:15',
            'cols'=>'required|numeric|min:0|max:15',
            'price'=>'required|numeric',
        ]);

        $hall = new Hall();

        $hall->name = $request->name;
        $hall->rows = $request->rows;
        $hall->cols = $request->cols;

        $hall->save();

        for ($i=0; $i < $request->rows; $i++) { 
            for ($j=1; $j <= $request->cols; $j++) { 
                $seat =  new Seat();
                $row = chr(65 + $i);
                $seat->row = $row;
                $seat->number = $row.$j;
                $seat->price = $request->price;
                $seat->hall_id = $hall->id;
                $seat->save();
            }
        }
        return response()->json([
            'status'=>true,
            'message'=>'Hall created successfully',
        ],200);
    }

    public function update(Request $request, $id){
        $request->validate([
            'name'=>'required',
            'rows'=>'required|numeric',
            'cols'=>'required|numeric',
            'price'=>'required|numeric',
        ]);

        $hall = Hall::find($id);

        if(!$hall){
            return response()->json([
                'status'=>false,
                'message'=>'Hall not found',
            ],404);
        }
        $hall->name = $request->name;
        
        $hall->save();


        $old_row = $hall->rows;
        $old_col = $hall->cols;

        $seats = Seat::where('hall_id',$id)->get();

        foreach ($seats as $seat) {
            $seat->price = $request->price;
            $seat->save();
        }

        if($old_col != $request->cols || $old_row != $request->rows){
            $hall->rows = $request->rows;
            $hall->cols = $request->cols;

            Seat::where('hall_id','=',$id)->delete();
    
            for ($i=0; $i < $request->rows; $i++) { 
                for ($j=1; $j <= $request->cols; $j++) { 
                    $seat =  new Seat();
                    $row = chr(65 + $i);
                    $seat->number = $row.$j;
                    $seat->price = $request->price;
                    $seat->hall_id = $hall->id;
                    $seat->save();
                }
            }
            $hall->save();
        }

        return response()->json([
            'message'=>'Hall updated successfully',
        ],200);        
    }

    public function delete($id){
        $hall = Hall::find($id);
        
        if(!$hall){
            return response()->json([
                'status'=>false,
                'message'=>'Hall not found',
            ],404);
        }

        $hall->delete();

        return response()->json([
            'message'=>'Hall deleted successfully',
        ],200); 
    }
}
