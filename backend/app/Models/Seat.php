<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    public function hall(){
        return $this->belongsTo(Hall::class);
    }
}
