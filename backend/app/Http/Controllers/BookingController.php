<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Booking_seat;
use App\Models\ShowSeat;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Dompdf\Dompdf;
use Illuminate\Support\Facades\Storage;

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
            $s->show_seat_id = $seat;
            $s->save();

            $show_seat = ShowSeat::findOrFail($seat);

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
            ->with('booking_seats.showSeat.seat')
            ->get();
        return response()->json([
            'status' => true,
            'reservations' => $reservations
        ]);
    }
    public function getTickets(Request $request)
    {
        $user = $request->user();

        $tickets = Booking::where('user_id', $user->id)
            ->where('status', 'bought')
            ->with('show.movie')
            ->with('booking_seats.showSeat.seat')
            ->get();
        return response()->json([
            'status' => true,
            'tickets' => $tickets
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

    public function buyTickets(Request $request)
    {
        $request->validate([
            'show_id' => 'required',
            'total' => 'required',
            'seats' => 'required',
            'booking_id' => 'nullable|exists:bookings,id'
        ]);


        if ($request->has('booking_id')) {
            $booking = Booking::findOrFail($request->booking_id);

            switch ($request->payment_method) {
                case 'esewa':
                    $data = $this->paymentController($booking);
                    return response()->json(['status' => true, 'data' => $data]);
                case 'khalti':
                    break;
                default:
                    return response()->json([
                        'status' => false,
                        'message' => ' Invalid payment option'
                    ], 422);
            }
        } else {
        }
        // $booking = new Booking();

        // $booking->user_id = $request->user()->id;
        // $booking->show_id = $request->show_id;
        // $booking->total_price = $request->total;
        // $booking->status = 'reserved';
        // $seats = explode(',', $request->seats);
        // $booking->save();

        // foreach ($seats as $seat) {
        //     $s = new Booking_seat();
        //     $s->booking_id = $booking->id;
        //     $s->seat_id = $seat;
        //     $s->save();
        // }
    }

    public function paymentController($booking)
    {
        $transaction = new Transaction();
        $transaction->booking_id = $booking->id;
        $transaction->status = 'pending';
        $transaction->amount = $booking->total_price;
        $transaction->save();
        // $transaction->payment_
        $msg = 'total_amount=' . $booking->total_price . ',transaction_uuid=' . $transaction->id . ',product_code=EPAYTEST';
        $s = base64_encode(hash_hmac('sha256', $msg, '8gBm/:&EnhH.1/q', true));
        $data = [
            'amount' => $booking->total_price,
            'tax_amount' => 0,
            'total_amount' => $booking->total_price,
            'transaction_uuid' => $transaction->id,
            'product_code' => 'EPAYTEST',
            'product_service_charge' => 0,
            'product_delivery_charge' => 0,
            'success_url' => 'http://localhost:5173/user/tickets',
            'failure_url' => 'http://localhost:5173/user/tickets?status=false',
            'signed_field_names' => 'total_amount,transaction_uuid,product_code',
            'signature' => $s,
        ];

        return $data;
    }

    public function verifyEsewa(Request $request)
    {
        $data = $request->query('data');
        $decodeData = base64_decode($data);

        $decodeData = json_decode($decodeData, true);

        if ($decodeData['status'] == 'COMPLETE') {
            if (!is_array($decodeData) || !isset($decodeData['signed_field_names'])) {
                return redirect()->back()->with('error', 'Invalid data format.');
            }

            $arrydata = $decodeData['signed_field_names'];
            $signed = explode(',', $arrydata);

            $msg = '';
            foreach ($signed as $s) {
                if ($s == 'total_amount') {
                    $decodeData[$s] = str_replace(",", "", $decodeData[$s]);
                }
                $msg .= $s . '=' . $decodeData[$s] . ',';
            }
            $msg = rtrim($msg, ',');

            $record = base64_encode(hash_hmac('sha256', $msg, '8gBm/:&EnhH.1/q', true));

            $transaction = Transaction::findOrFail($decodeData['transaction_uuid']);


            $booking = Booking::findOrFail($transaction->booking_id);

            if ($decodeData['signature'] == $record) {
                $transaction->status = "COMPLETED";
                $transaction->save();
                $booking->status = 'bought';
                $booking->qr_token = Str::uuid();
                $booking->save();

                $ids = $booking->booking_seats->pluck('showSeat.id')->toArray();

                foreach ($ids as $id) {
                    $showSeat = ShowSeat::findOrFail($id);
                    $showSeat->status = 'bought';
                    $showSeat->save();
                }
                return response()->json(['status' => true, 'message' => 'Ticket bought successfully!']);
            } else {
                return response()->json(['status' => false, 'message' => 'Transaction failed!']);
            }
        }
    }
    public function showQrCode(Request $request, $id)
    {
        $booking = Booking::with(['show.movie', 'show.hall', 'booking_seats.showSeat.seat'])->findOrFail($id);

        if ($request->user()->id !== $booking->user_id) {
            abort(403, 'Unauthorized access to this ticket');
        }
        $renderer = new ImageRenderer(
            new RendererStyle(150),
            new SvgImageBackEnd()
        );
        $qrCode = (new Writer($renderer))->writeString($booking->qr_token);

        $data = [
            'booking' => $booking,
            'qrCode' => $qrCode,
        ];
        $dompdf = new Dompdf();
        $dompdf->loadHtml(view('tickets.pdf', $data));
        $dompdf->setPaper('A6', 'portrait');
        $dompdf->render();

        return response($dompdf->output(), 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Access-Control-Expose-Headers', 'Content-Disposition')
            ->header('Content-Disposition', 'attachment; filename="ticket-' . $booking->id . '.pdf"');
    }
}
