<?php

use Illuminate\Support\Facades\Route;

Route::post('/login', 'Api\AuthController@login');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('expenses', 'Api\ExpenseController');
    Route::apiResource('categories', 'Api\ExpenseCategoryController');
    
    Route::post('/expenses/{expense}/approve', 'Api\ExpenseApprovalController@approve');
    Route::post('/expenses/{expense}/reject', 'Api\ExpenseApprovalController@reject');
    
    Route::get('/dashboard', 'Api\DashboardController@index');

    Route::post('/logout', 'Api\AuthController@logout');
    Route::get('/me', 'Api\AuthController@me');
}); 