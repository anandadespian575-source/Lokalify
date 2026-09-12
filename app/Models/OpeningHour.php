<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OpeningHour extends Model
{
    protected $fillable = [
        'destination_id',
        'day',
        'open_time',
        'close_time',
    ];

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }
}