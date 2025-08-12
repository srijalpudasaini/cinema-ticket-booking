<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    public function show(){
        return $this->belongsTo(Show::class);
    }
   public function booking_seats(){
    return $this->hasMany(Booking_seat::class);
   }

   public function user(){
    return $this->belongsTo(User::class);
   }

}
