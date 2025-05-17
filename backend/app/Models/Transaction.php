<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';

    public function booking(){
        return $this->belongsTo(Booking::class);
    }
    
}
