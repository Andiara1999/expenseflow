<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExpenseCategory;
use Illuminate\Http\Request;
use App\Http\Resources\ExpenseCategoryResource;


class ExpenseCategoryController extends Controller
{
    public function index()
    {
        return ExpenseCategoryResource::collection(ExpenseCategory::all());
    }

    public function store(Request $request)
    {
        $category = ExpenseCategory::create($request->validate([
            'name' => 'required|string|max:255'
        ]));

        return new ExpenseCategoryResource($category);
    }

    public function show($id)
    {
        return new ExpenseCategoryResource(ExpenseCategory::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $category = ExpenseCategory::findOrFail($id);

        $category->update($request->validate([
            'name' => 'required|string|max:255'
        ]));

        return new ExpenseCategoryResource($category);
    }

    public function destroy($id)
    {
        ExpenseCategory::destroy($id);

        return response()->noContent();
    }
}