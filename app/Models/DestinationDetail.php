<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Detail extends Model
{
    protected $fillable = [
        'destination_id',
        'description',
    ];

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }
}