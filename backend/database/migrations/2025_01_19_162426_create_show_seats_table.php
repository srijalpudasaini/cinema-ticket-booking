<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('show_seats', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('show_id')->unsigned();
            $table->bigInteger('seat_id')->unsigned();
            $table->char('row');
            $table->enum('status',['available','reserved','unavailable','bought'])->default('available');
            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->timestamp('selected_at')->nullable();
            $table->foreign('show_id')->references('id')->on('shows')->onDelete('cascade');
            $table->foreign('seat_id')->references('id')->on('seats')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('show_seats');
    }
};
