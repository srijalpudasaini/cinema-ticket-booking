<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking_seat extends Model
{
    public function booking(){
        return $this->belongsTo(Booking::class);
    }
    public function seat(){
        return $this->belongsTo(Seat::class);
    }
}
