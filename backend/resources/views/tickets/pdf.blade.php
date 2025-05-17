<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .ticket {
            width: 100%;
            max-width: 420px;
            padding: 5px
            margin: 0 auto;
            border: 1px solid #ddd;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .movie-title {
            font-size: 1em;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .theater {
            font-size: 0.8em;
            color: #555;
        }

        .details {
            margin: 5px 0;
            border-top: 1px dashed #ccc;
            border-bottom: 1px dashed #ccc;
            padding: 5px 0;
        }
        .details p{
            font-size:0.8em;
        }

        .qr-container {
            text-align: center;
            margin: 15px 0;
        }

    </style>
</head>

<body>
    <div class="ticket">

        <div class="movie-title">{{ $booking->show->movie->name }}</div>
        <div class="theater">{{ $booking->show->hall->name }}</div>

        <div class="details">
            <p><strong>Date:</strong> {{ $booking->show->date }}</p>
            <p><strong>Time:</strong> {{ $booking->show->time->format('g:i A') }}</p>
            <p><strong>Seats:</strong>
                {{ $booking->booking_seats->map(function ($item) {
                        return $item->showSeat->seat->number;
                    })->join(', ') }}
            </p>
        </div>

        <div class="qr-container">
            <img src="data:image/svg+xml;base64,{{ base64_encode($qrCode) }}" style="width: 150px; height: 150px;">
        </div>
    </div>
</body>

</html>
