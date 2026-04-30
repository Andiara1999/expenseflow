<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpenseApprovalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::create('expense_approvals', function (Blueprint $table) {
        $table->id();
        $table->foreignId('expense_id')->constrained()->onDelete('cascade');
        $table->foreignId('approved_by')->constrained('users')->onDelete('cascade');
        $table->string('status');
        $table->text('comment')->nullable();
        $table->timestamps();
    });
}
}
