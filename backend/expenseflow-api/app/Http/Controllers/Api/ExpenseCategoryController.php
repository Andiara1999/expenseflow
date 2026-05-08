<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExpenseCategory;
use App\Http\Resources\ExpenseCategoryResource;
use Illuminate\Http\Request;

class ExpenseCategoryController extends Controller
{
    public function index()
    {
        return ExpenseCategory::all();
    }


    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Apenas administradores podem criar categorias.'
            ], 403);
        }

    $category = ExpenseCategory::create($request->validate([
        'name' => 'required|string|max:255'
    ]));

    return new ExpenseCategoryResource($category);
    }

    public function show($id)
    {
        return ExpenseCategory::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $category = ExpenseCategory::findOrFail($id);

        $category->update($request->validate([
            'name' => 'required|string|max:255'
        ]));

        return $category;
    }

    public function destroy($id)
    {
        ExpenseCategory::destroy($id);

        return response()->noContent();
    }
}