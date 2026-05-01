<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExpenseApproval extends Model
{
    protected $fillable = [
        'expense_id',
        'approved_by',
        'status',
        'comment'
    ];
}