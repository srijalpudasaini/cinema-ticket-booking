<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Booking_seat;
use App\Models\ShowSeat;
use App\Models\Transaction;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::all();

        return response()->json([
            'status' => true,
            'bookings' => $bookings
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'show_id' => 'required',
            'total' => 'required',
            'seats' => 'required'
        ]);

        $booking = new Booking();

        $booking->user_id = $request->user()->id;
        $booking->show_id = $request->show_id;
        $booking->total_price = $request->total;
        $booking->status = 'reserved';
        $seats = explode(',', $request->seats);
        $booking->save();

        foreach ($seats as $seat) {
            $s = new Booking_seat();
            $s->booking_id = $booking->id;
            $s->seat_id = $seat;
            $s->save();

            $show_seat = ShowSeat::where('show_id', $request->show_id)
                ->where('seat_id', $seat)
                ->first();

            $show_seat->status = 'reserved';
            $show_seat->save();
        }

        $show_seats = ShowSeat::where('show_id', $request->show_id)
            ->with('seat')
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Booking successfully done',
            'show_seats' => $show_seats
        ], 200);
    }

    public function getReservations(Request $request)
    {
        $user = $request->user();

        $reservations = Booking::where('user_id', $user->id)
            ->where('status', 'reserved')
            ->with('show.movie')
            ->with('booking_seats.seat')
            ->get();
        return response()->json([
            'status' => true,
            'reservations' => $reservations
        ]);
    }

    public function cancelSeats(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);
        $user = $request->user();

        $reservation = Booking::findOrFail($request->id);

        if ($reservation->user_id != $user->id) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized',
            ], 401);
        }

        $show_id = $reservation->show_id;
        $seats = Booking_seat::where('booking_id', $reservation->id)->pluck('seat_id');

        $show_seats = ShowSeat::where('show_id', $show_id)->whereIn('seat_id', $seats)->get();

        // Update the show seats status and user_id
        foreach ($show_seats as $show_seat) {
            $show_seat->user_id = null;
            $show_seat->status = 'available';
            $show_seat->save();
        }

        $reservation->delete();

        return response()->json([
            'status' => true,
            'message' => 'Seat reservations cancelled!'
        ]);
    }

    public function buyTickets(Request $request){
        $request->validate([
            'show_id' => 'required',
            'total' => 'required',
            'seats' => 'required'
        ]);

        $booking = new Booking();

        $booking->user_id = $request->user()->id;
        $booking->show_id = $request->show_id;
        $booking->total_price = $request->total;
        $booking->status = 'reserved';
        $seats = explode(',', $request->seats);
        $booking->save();

        foreach ($seats as $seat) {
            $s = new Booking_seat();
            $s->booking_id = $booking->id;
            $s->seat_id = $seat;
            $s->save();
        }
    }

    public function paymentController(Booking $booking){
        $transaction = new Transaction();
        $transaction->booking_id = $booking->id;
        $transaction->status = 'pending';
        $transaction->amount = $booking->total_price;
        
        $signature = base64_encode(hash_hmac('sha256', 'total_amount=' . $booking->total_price  . ',transaction_uuid=' . $transaction->id . ',product_code=EPAYTEST', '8gBm/:&EnhH.1/q', true));

        
    }
}
