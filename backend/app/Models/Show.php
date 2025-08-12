<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Show extends Model
{
    protected $casts = [
    'time' => 'datetime',
    ];
    public function movie(){
        return $this->belongsTo(Movie::class);
    }
    public function hall(){
        return $this->belongsTo(Hall::class);
    }

    public function showSeat(){
        return $this->hasMany(ShowSeat::class);
    }

    public function bookings(){
        return $this->hasMany(Booking::class);
    }
    public function getEndTime()
    {
        if (!$this->movie || !$this->time) {
            return null;
        }

        return Carbon::parse($this->time)->addMinutes($this->movie->runtime);
    }

    //
}
