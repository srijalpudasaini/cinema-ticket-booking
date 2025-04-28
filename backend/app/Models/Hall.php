<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hall extends Model
{
    public function seats(){
        return $this->hasMany(Seat::class);
    }
}
