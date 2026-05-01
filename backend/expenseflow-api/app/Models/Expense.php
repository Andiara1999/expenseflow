<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ExpenseCategory;
use App\Models\User;

class Expense extends Model
{
    protected $fillable = [
        'user_id',
        'expense_category_id',
        'title',
        'description',
        'amount',
        'expense_date',
        'status',
        'receipt_path'
    ];

    public function category()
{
    return $this->belongsTo(ExpenseCategory::class, 'expense_category_id');
}

public function user()
{
    return $this->belongsTo(User::class);
}
}