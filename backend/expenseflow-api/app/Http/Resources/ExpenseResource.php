<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'amount' => $this->amount,
            'status' => $this->status,
            'expense_date' => $this->expense_date,

            'category' => $this->category->name ?? null,

            'created_at' => $this->created_at,
        ];
    }
}