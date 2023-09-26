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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('surnames');
            $table->string('email')->unique();
            $table->string('nick')->unique();
            $table->string('password');
            $table->foreignId('character_id')
                ->nullable()
                ->constrained('characters')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->string('avatar')->default('user_placeholder.webp');
            $table->integer('total_puntuation')->default(0);
            $table->string('birth_date');
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
        Schema::dropIfExists('students');
    }
};
