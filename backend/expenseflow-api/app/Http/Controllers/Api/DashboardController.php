<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\DashboardResource;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $query = Expense::where('user_id', $userId);

        // Filtro por mês
        if ($request->has('month')) {
            $query->whereMonth('expense_date', $request->month);
        }

        // Filtro por ano
        if ($request->has('year')) {
            $query->whereYear('expense_date', $request->year);
        }

        $data = [
            // CONTADORES
            'total_expenses' => (clone $query)->count(),

            'total_pending' => (clone $query)
                ->where('status', 'pending')
                ->count(),

            'total_approved' => (clone $query)
                ->where('status', 'approved')
                ->count(),

            'total_paid' => (clone $query)
                ->where('status', 'paid')
                ->count(),

            // VALORES
            'total_amount' => (clone $query)->sum('amount'),

            'total_amount_pending' => (clone $query)
                ->where('status', 'pending')
                ->sum('amount'),

            'total_amount_approved' => (clone $query)
                ->where('status', 'approved')
                ->sum('amount'),

            'total_amount_paid' => (clone $query)
                ->where('status', 'paid')
                ->sum('amount'),

            // AGRUPADO POR CATEGORIA
            'expenses_by_category' => (clone $query)
                ->join('expense_categories', 'expenses.expense_category_id', '=', 'expense_categories.id')
                ->select(
                    'expense_categories.name as category',
                    DB::raw('SUM(expenses.amount) as total')
                )
                ->groupBy('expense_categories.name')
                ->get(),
        ];

        return new DashboardResource($data);
    }
}