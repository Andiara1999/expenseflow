<?php

use Illuminate\Support\Facades\Route;

Route::post('/login', 'Api\AuthController@login');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('categories', 'Api\ExpenseCategoryController');
    Route::apiResource('expenses', 'Api\ExpenseController');
    
    Route::post('/expenses/{expense}/approve', 'Api\ExpenseApprovalController@approve');
    Route::post('/expenses/{expense}/reject', 'Api\ExpenseApprovalController@reject');
    Route::get('/dashboard', 'Api\DashboardController@index');
});