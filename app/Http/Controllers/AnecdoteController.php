<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AnecdoteController extends Controller
{
    public function index(Request $request)
    {
        $anecdotes = Anecdote::with('user')
            ->withCount('votes')
            ->offset($request->offset ?? 0)
            ->limit($request->limit ?? 10)
            ->get();

        return response()->json($anecdotes);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
        ]);

        $anecdote = Anecdote::create([
            'user_id' => $request->user()->id,
            'title' => $validated['title'],
            'content' => $validated['content'],
            'category' => $request->category ?? 'Général',
        ]);

        return response()->json($anecdote);
    }

    public function destroy(Request $request, $id)
    {
        $anecdote = Anecdote::findOrFail($id);

        if ($request->user()->id !== $anecdote->user_id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $anecdote->delete();

        return response()->json(['message' => 'Anecdote supprimée']);
    }
}

