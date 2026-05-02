<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;

class ExpensePaymentController extends Controller
{
    public function markAsPaid(Request $request, Expense $expense)
    {
        if ($request->user()->role !== 'finance') {
            return response()->json([
                'message' => 'Apenas o financeiro pode marcar despesas como pagas.'
            ], 403);
        }

        if ($expense->status !== 'approved') {
            return response()->json([
                'message' => 'Somente despesas aprovadas podem ser pagas.'
            ], 422);
        }

        $expense->update([
            'status' => 'paid'
        ]);

        return response()->json([
            'message' => 'Despesa marcada como paga com sucesso.',
            'expense' => $expense
        ]);
    }
}