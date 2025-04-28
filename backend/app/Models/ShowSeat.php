<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShowSeat extends Model
{
    public function show(){
        return $this->belongsTo(Show::class);
    }
    public function seat(){
        return $this->belongsTo(Seat::class);
    }
}
