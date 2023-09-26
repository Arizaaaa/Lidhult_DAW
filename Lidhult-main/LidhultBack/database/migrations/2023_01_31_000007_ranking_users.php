<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ranking_users', function (Blueprint $table) {
            $table->foreignId('ranking_id')
                ->nullable()
                ->constrained('rankings')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('student_id')
                ->nullable()
                ->constrained('students')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->integer('puntuation');
            $table->integer('skill_points')
                ->default(1000);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ranking_users');
    }
};
