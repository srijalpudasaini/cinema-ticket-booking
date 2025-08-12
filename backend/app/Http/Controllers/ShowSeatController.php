<?php

namespace App\Http\Controllers;

use App\Models\Seat;
use App\Models\Show;
use App\Models\ShowSeat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ShowSeatController extends Controller
{
    public function selectSeat(Request $request)
    {
        $request->validate([
            'show_id' => 'required|exists:shows,id',
            'seat_id' => 'required|exists:show_seats,id',
            'num_seats' => 'required|integer|min:1',
        ]);

        $seat = ShowSeat::findOrFail($request->seat_id);
        $seats = $this->recommendBestSeats($request->show_id, $request->num_seats,$request->user()->id);

        if ($seat->status == 'unavailable' && $seat->user_id == $request->user()->id) {
            $seat->status = 'available';
            $seat->user_id = null;
            $seat->selected_at = null;
            $seat->save();
        } elseif ($seat->status != 'available') {
            $show_seats = ShowSeat::where('show_id', $request->show_id)
                ->with('seat')
                ->get();

            return response()->json([
                'status' => false,
                'message' => 'Seat not available',
                'seat' => $seat,
                'show_seats' => $show_seats
            ], 400);
        } else {
            // Select seat
            $seat->status = 'unavailable';
            $seat->user_id = $request->user()->id;
            $seat->selected_at = now();
            $seat->save();
        }

        // Always return latest seat statuses
        $show_seats = ShowSeat::where('show_id', $request->show_id)
            ->with('seat')
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Seat status updated',
            'seat' => $seat,
            'show_seats' => $show_seats,
            'best_group_seats' => $seats,
        ], 200);
    }


    public function resetSeat(Request $request)
    {
        $request->validate([
            'show_id' => 'required|exists:shows,id',
            'seats.*' => 'exists:show_seats,id'
        ]);
        foreach ($request->seats as $id) {
            $seat = ShowSeat::findOrFail($id);
            $seat->status = 'available';
            $seat->user_id = null;
            $seat->save();
        }
        $show_seats = ShowSeat::where('show_id', $request->show_id)
            ->with('seat')
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Seats unselected',
            'show_seats' => $show_seats
        ]);
    }


    public function recommendBestSeats(int $showId, int $numberOfSeats, int $userId)
    {
        $show = Show::with('hall')->find($showId);
        $rows = $show->hall->rows;
        $cols = $show->hall->cols;

        // Get available seats OR seats reserved by current user
        $availableSeats = ShowSeat::where('show_id', $showId)
            ->where(function ($query) use ($userId) {
                $query->where('status', 'available');
                if ($userId) {
                    $query->orWhere(function ($q) use ($userId) {
                        $q->where('status', 'unavailable')
                            ->where('user_id', $userId);
                    });
                }
            })
            ->with('seat')
            ->get();

        $scoredSeats = $availableSeats->map(function ($showSeat) use ($rows, $cols) {
            return [
                'show_seat_id' => $showSeat->id,
                'seat_id' => $showSeat->seat_id,
                'row' => $showSeat->row,
                'col' => $showSeat->seat->col,
                'score' => $this->calculateSeatScore($showSeat->seat, $rows, $cols)
            ];
        })->sortByDesc('score');

        // For single seat
        if ($numberOfSeats == 1) {
            return [$scoredSeats->first()];
        }

        // For multiple seats, find best adjacent group
        $bestSeats = $this->findBestAdjacentSeats($scoredSeats, $numberOfSeats);

        return $bestSeats ?? collect();
    }

    function calculateSeatScore($seat, $totalRows, $totalCols)
    {
        $row = $seat->row; // e.g., 'A', 'B', etc.
        $col = $seat->col;

        // Convert row letter to numeric value (A=0, B=1, etc.)
        $rowNum = ord(strtoupper($row)) - ord('A');

        // Center column score (distance from center)
        $centerCol = ($totalCols - 1) / 2;
        $colDistance = abs($col - 1 - $centerCol); // col is 1-based
        $colScore = 1 - ($colDistance / $centerCol);

        // Row score (middle rows are better)
        $centerRow = ($totalRows - 1) / 2;
        $rowDistance = abs($rowNum - $centerRow);
        
        // Prefer rows BELOW center when equidistant (D over B in 5x5 hall)
        $rowBias = ($rowNum > $centerRow) ? 0.01 : 0;
        $rowScore = (1 - ($rowDistance / $centerRow)) + $rowBias;

        // Combined score (slightly more weight to row centrality)
        return ($colScore * 0.4) + ($rowScore * 0.6);
    }

    function findBestAdjacentSeats($scoredSeats, $numSeats)
    {
        // First sort by score descending
        $sortedByScore = $scoredSeats->sortByDesc('score');
        
        // Then group by row, but sort rows by proximity to center with preference for LOWER rows
        $rows = $sortedByScore->groupBy('row')->sortBy(function($seats, $rowLetter) {
            $rowNum = ord(strtoupper($rowLetter)) - ord('A');
            // Use negative rowNum to sort higher rows first, but since we have rowBias in scoring,
            // we don't need additional sorting here
            return $rowNum;
        });

        $bestGroup = null;
        $bestGroupScore = 0;

        foreach ($rows as $row => $seats) {
            // Sort seats in row by column number
            $sortedSeats = $seats->sortBy('col')->values();

            // Find all possible adjacent groups
            for ($i = 0; $i <= $sortedSeats->count() - $numSeats; $i++) {
                $group = $sortedSeats->slice($i, $numSeats)->values();

                // Check if seats are adjacent
                $isAdjacent = true;
                for ($j = 1; $j < $numSeats; $j++) {
                    if (!isset($group[$j]) || $group[$j]['col'] != $group[$j - 1]['col'] + 1) {
                        $isAdjacent = false;
                        break;
                    }
                }

                if ($isAdjacent) {
                    $groupScore = $group->sum('score');
                    if ($groupScore > $bestGroupScore) {
                        $bestGroupScore = $groupScore;
                        $bestGroup = $group;
                    }
                }
            }
        }

        return $bestGroup;
    }
}
