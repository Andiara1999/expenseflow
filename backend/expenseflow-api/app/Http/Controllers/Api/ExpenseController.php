<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;
use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        return Expense::with(['category', 'user'])
            ->where('user_id', $request->user()->id)
            ->get();
    }

    public function store(StoreExpenseRequest $request)
    {
        $data = $request->validated();

        $data['user_id'] = $request->user()->id;
        $data['status'] = 'pending';

        $expense = Expense::create($data);

        return response()->json($expense, 201);
    }

    public function show($id)
    {
        return Expense::findOrFail($id);
    }

    public function update(UpdateExpenseRequest $request, $id)
    {
    $expense = Expense::findOrFail($id);

    if ($expense->status !== 'pending') {
        return response()->json([
            'message' => 'Somente despesas pendentes podem ser editadas.'
        ], 422);
    }

    $expense->update($request->validated());

    return response()->json($expense);
    }

    public function destroy($id)
    {
        Expense::destroy($id);

        return response()->noContent();
    }
}