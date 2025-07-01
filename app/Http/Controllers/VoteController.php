<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function store(Request $request, $id)
    {
        $request->validate([
            'type' => 'required|in:Bof,Excellent,Technique,Wow',
        ]);

        $vote = Vote::updateOrCreate(
            ['user_id' => $request->user()->id, 'anecdote_id' => $id],
            ['type' => $request->type]
        );

        return response()->json(['message' => 'Vote enregistré']);
    }
}

