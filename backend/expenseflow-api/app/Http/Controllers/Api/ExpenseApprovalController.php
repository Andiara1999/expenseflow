<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\ExpenseApproval;
use Illuminate\Http\Request;

class ExpenseApprovalController extends Controller
{
    public function approve(Request $request, Expense $expense)
    {
        if ($expense->status !== 'pending') {
            return response()->json([
                'message' => 'Somente despesas pendentes podem ser aprovadas.'
            ], 422);
        }

        $expense->update([
            'status' => 'approved'
        ]);

        $approval = ExpenseApproval::create([
            'expense_id' => $expense->id,
            'approved_by' => $request->user()->id,
            'status' => 'approved',
            'comment' => $request->input('comment')
        ]);

        return response()->json([
            'message' => 'Despesa aprovada com sucesso.',
            'expense' => $expense,
            'approval' => $approval
        ]);
    }

    public function reject(Request $request, Expense $expense)
    {
        $data = $request->validate([
            'comment' => 'required|string|max:1000'
        ]);

        if ($expense->status !== 'pending') {
            return response()->json([
                'message' => 'Somente despesas pendentes podem ser recusadas.'
            ], 422);
        }

        $expense->update([
            'status' => 'rejected'
        ]);

        $approval = ExpenseApproval::create([
            'expense_id' => $expense->id,
            'approved_by' => $request->user()->id,
            'status' => 'rejected',
            'comment' => $data['comment']
        ]);

        return response()->json([
            'message' => 'Despesa recusada com sucesso.',
            'expense' => $expense,
            'approval' => $approval
        ]);
    }
}