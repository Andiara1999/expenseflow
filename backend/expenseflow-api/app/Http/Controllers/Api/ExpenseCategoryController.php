<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExpenseCategory;
use Illuminate\Http\Request;

class ExpenseCategoryController extends Controller
{
    public function index()
    {
        return ExpenseCategory::all();
    }


    public function store(Request $request)
    {
        $category = ExpenseCategory::create($request->validate([
            'name' => 'required|string|max:255'
        ]));

        return response()->json($category, 201);
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