<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('categories', 'Api\ExpenseCategoryController');
Route::apiResource('expenses', 'Api\ExpenseController');