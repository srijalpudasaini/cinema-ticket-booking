<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ShowSeat;
use Carbon\Carbon;

class ResetUnconfirmedSeats extends Command
{
    protected $signature = 'reset:seats';
    protected $description = 'Reset seats that were selected but not confirmed after 10 minutes';

    public function handle()
    {
        ShowSeat::where('status', 'unavailable')
            ->where('selected_at', '<', Carbon::now()->subMinutes(10))
            ->update([
                'status' => 'available',
                'user_id' => null,
                'selected_at' => null
            ]);

        $this->info('Expired seats have been reset.');
    }
}
