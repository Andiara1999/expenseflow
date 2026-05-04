<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DashboardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'sumary'=> [
                'total_expenses' => $this['total_expenses'],
                'total_pending' => $this['total_pending'],
                'total_approved' => $this['total_approved'],
                'total_paid' => $this['total_paid'],
            ],
            'amounts' => [
                'total_amount' => $this['total_amount'],
                'total_amount_pending'=> $this['total_amount_pending'],
                'total_amount_approved' => $this['total_amount_approved'],
                'total_amount_paid' => $this['total_amount_paid'],
            ],
            'expenses_by_category' => $this['expenses_by_category'],       
        ];
    }
}
