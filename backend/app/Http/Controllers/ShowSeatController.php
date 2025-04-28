<?php

namespace App\Http\Controllers;

use App\Models\Seat;
use App\Models\ShowSeat;
use Illuminate\Http\Request;

class ShowSeatController extends Controller
{
    public function selectSeat(Request $request)
    {
        $request->validate([
            'show_id' => 'required|exists:shows,id',
        ]);

        $seat = ShowSeat::where('show_id', $request->show_id)->where('seat_id', $request->seat_id)->first();

        if (!$seat) {
            return response()->json([
                'status' => false,
                'message' => 'Seat not found',
            ], 404);
        }

        if ($seat->status == 'unavailable' && $seat->user_id == $request->user()->id) {
            $seat->status = 'available';
            $seat->user_id = null;
            $seat->selected_at = null;
            $seat->save();
            $show_seats = ShowSeat::where('show_id', $request->show_id)
                ->with('seat')
                ->get();

            return response()->json([
                'status' => true,
                'message' => 'Seat unselected',
                'seat' => $seat,
                'show_seats' => $show_seats
            ], 200);
        }
        if ($seat->status != 'available') {
            return response()->json([
                'status' => false,
                'message' => 'Seat not available',
                'seat' => $seat
            ], 400);
        }
        $seat->status = 'unavailable';
        $seat->user_id = $request->user()->id;
        $seat->selected_at = now();
        $seat->save();
        return response()->json([
            'status' => true,
            'message' => 'Seat selected',
            'seat' => $seat
        ], 200);
    }

    public function resetSeat(Request $request){
        $request->validate([
            'show_id' => 'required|exists:shows,id',
        ]);
        $seats = ShowSeat::where('show_id',$request->show_id)
                            ->where('user_id',$request->user()->id)
                            ->where('status','unavailable')
                            ->get();
        foreach($seats as $seat){
            $seat->status = 'available';
            $seat->user_id = null;
            $seat->save();
        }
        $show_seats = ShowSeat::where('show_id', $request->show_id)
                ->with('seat')
                ->get();

        return response()->json([
            'status'=>true,
            'message'=>'Seats unselected',
            'show_seats'=>$show_seats
        ]);
    }
}
