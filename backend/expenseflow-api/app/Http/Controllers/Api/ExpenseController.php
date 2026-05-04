<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExpenseResource;
use App\Models\Expense;
use Illuminate\Http\Request;
use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        $expenses = Expense::with('category')
            ->where('user_id', $request->user()->id)
            ->get();

        return ExpenseResource::collection($expenses);
    }

    public function store(StoreExpenseRequest $request)
    {
        $data = $request->validated();

        $data['user_id'] = $request->user()->id;
        $data['status'] = 'pending';

        $expense = Expense::create($data);

        return new ExpenseResource($expense);
    }

    public function show($id)
    {
        return new ExpenseResource($expense);
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

    return new ExpenseResource($expense);
    }

    public function destroy($id)
    {
        Expense::destroy($id);

        return response()->noContent();
    }
}