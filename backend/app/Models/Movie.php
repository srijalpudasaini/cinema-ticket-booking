<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    //
    public function shows(){
        return $this->hasMany(Show::class);
    }
    public function genres(){
        return $this->belongsToMany(Genre::class,'movie_genres');
    }
}
