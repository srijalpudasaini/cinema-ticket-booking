<?php

namespace App\Models;

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

    //
}
