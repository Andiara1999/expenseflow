<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}