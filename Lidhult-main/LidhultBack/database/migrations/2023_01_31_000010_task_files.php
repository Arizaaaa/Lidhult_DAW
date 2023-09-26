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
        Schema::create('task_files', function (Blueprint $table) {
            $table->foreignId('task_id')
            ->nullable()
            ->constrained('tasks')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->foreignId('student_id')
            ->nullable()
            ->constrained('students')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->string('link');
            $table->integer('puntuation');
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
        Schema::dropIfExists('task_files');
    }
};
