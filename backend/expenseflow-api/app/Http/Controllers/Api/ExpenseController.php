<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        return Expense::with(['category', 'user'])
            ->where('user_id', $request->user()->id)
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'expense_category_id' => 'required|exists:expense_categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'amount' => 'required|numeric|min:0.01',
            'expense_date' => 'required|date',
            'status' => 'nullable|string',
            'receipt_path' => 'nullable|string'
        ]);

        $data['user_id'] = $request->user()->id;
        $data['status'] = $data['status'] ?? 'pending';

        $expense = Expense::create($data);

        return response()->json($expense, 201);
    }

    public function show($id)
    {
        return Expense::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $expense = Expense::findOrFail($id);

        $expense->update($request->validate([
            'expense_category_id' => 'required|exists:expense_categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'amount' => 'required|numeric|min:0.01',
            'expense_date' => 'required|date',
            'status' => 'nullable|string',
            'receipt_path' => 'nullable|string'
        ]));

        return $expense;
    }

    public function destroy($id)
    {
        Expense::destroy($id);

        return response()->noContent();
    }
}