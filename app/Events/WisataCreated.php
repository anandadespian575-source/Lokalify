<?php

namespace App\Events;

use App\Models\Wisata;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class WisataCreated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $wisata;

    public function __construct(Wisata $wisata)
    {
        $this->wisata = $wisata;
    }

    public function broadcastOn()
    {
        return new Channel('wisata-channel');
    }

    public function broadcastAs()
    {
        return 'wisata.added';
    }
}