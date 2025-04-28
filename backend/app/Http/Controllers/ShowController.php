<?php

namespace App\Http\Controllers;

use App\Models\Seat;
use App\Models\Show;
use App\Models\ShowSeat;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ShowController extends Controller
{
    public function index()
    {
        $shows = Show::with('movie')->with('hall')->get();
        return response()->json([
            'status' => true,
            'shows' => $shows
        ], 200);
    }

    public function show($id)
    {
        $show = Show::find($id);

        if (!$show) {
            return response()->json([
                'status' => false,
                'message' => 'Show not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'show' => $show
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'movie_id' => 'required|exists:movies,id',
            'hall_id' => 'required|exists:halls,id',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required'
        ]);

        $showVal = Show::where('date', $request->date)
            ->where('time', $request->time)
            ->where('hall_id', $request->hall_id)
            ->where('id', '!=', $request->id)
            ->exists(); 

        if ($showVal) {
            return response()->json([
                'status' => false,
                'message' => 'A show already exists for this date, time, and hall'
            ], 503);
        }  

        $show = new Show();
        $show->movie_id = $request->movie_id;
        $show->hall_id = $request->hall_id;
        $show->date = $request->date;
        $show->time = $request->time;
        $show->save();


        $seats = Seat::where('hall_id', $request->hall_id)->get();

        foreach ($seats as $seat) {
            $s = new ShowSeat();
            $s->show_id = $show->id;
            $s->seat_id = $seat->id;
            $s->row = $seat->row;
            $s->save();
        }

        return response()->json([
            'status' => true,
            'message' => 'Show added successfully'
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $show = Show::find($id);

        if (!$show) {
            return response()->json([
                'status' => false,
                'message' => 'Show not found'
            ], 404);
        }

        $showVal = Show::where('date', $request->date)
            ->where('time', $request->time)
            ->where('hall_id', $request->hall_id)
            ->where('id', '!=', $request->id)
            ->exists(); 

        if ($showVal) {
            return response()->json([
                'status' => false,
                'message' => 'A show already exists for this date, time, and hall'
            ], 503);
        }
        $request->validate([
            'movie_id' => 'required',
            'hall_id' => 'required',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required'
        ]);

        $oldHallId = $show->hall_id;

        $show->movie_id = $request->movie_id;
        $show->hall_id = $request->hall_id;
        $show->date = $request->date;
        $show->time = $request->time;

        $show->save();

        if ($oldHallId != $request->hall_id) {

            ShowSeat::where('show_id', $show->id)->delete();

            $seats = Seat::where('hall_id', $request->hall_id)->get();
            foreach ($seats as $seat) {
                $s = new ShowSeat();
                $s->show_id = $show->id;
                $s->seat_id = $seat->id;
                $s->save();
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Show updated successfully'
        ], 200);
    }

    public function delete($id)
    {
        $show = Show::find($id);

        if (!$show) {
            return response()->json([
                'status' => false,
                'message' => 'Show not found'
            ], 404);
        }
        $show->delete();


        return response()->json([
            'status' => true,
            'message' => 'Show deleted successfully'
        ], 200);
    }

    public function getDates(Request $request){
        $dates = Show::where('movie_id',$request->id)
               ->whereDate('date','>=',Carbon::now())
               ->groupBy('date')
               ->get(['date']);
        return response()->json($dates);
    }

    public function getHallsByDate(Request $request){
        $halls = Show::where('movie_id',$request->id)
                    ->whereDate('date',$request->date)
                    ->with('hall')
                    ->with('hall.seats')
                    ->groupBy('hall_id')
                    ->get(['hall_id']);
        // $halls = Show::all();

        return response()->json($halls);
    }

    public function getTimesByHall(Request $request){
        $times = Show::where('movie_id',$request->id)
                        ->where('date',$request->date)
                        ->where('hall_id',$request->hall_id)
                        ->get(['time']);
        return response()->json($times);
    }

    public function getShowSeats(Request $request){
        $show = Show::where('movie_id',$request->id)
                      ->where('date',$request->date)
                      ->where('hall_id',$request->hall_id)
                      ->where('time',$request->time)
                      ->with('showSeat')
                      ->with('showSeat.seat')
                      ->first();

        return response()->json($show);
    }
}
