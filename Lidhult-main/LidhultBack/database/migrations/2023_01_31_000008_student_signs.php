<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::create('student_signs', function (Blueprint $table) {
            $table->foreignId('sign_id')
                ->nullable()
                ->constrained('signs')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('last_evaluator')
                ->nullable()
                ->constrained('students')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('student_id')
                ->nullable()
                ->constrained('students')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('ranking_id')
                ->nullable()
                ->constrained('rankings')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->integer('puntuation');
            $table->integer('last_points')
                ->nullable();
            $table->timestamps();
        });

        DB::unprepared('CREATE TRIGGER add_signs AFTER INSERT ON `ranking_users` FOR EACH ROW
                BEGIN
                   INSERT INTO `student_signs` (`sign_id`, `student_id`, `ranking_id`, `puntuation`, `created_at`) VALUES (1, NEW.student_id, NEW.ranking_id, 0, now());
                   INSERT INTO `student_signs` (`sign_id`, `student_id`, `ranking_id`, `puntuation`, `created_at`) VALUES (7, NEW.student_id, NEW.ranking_id, 0, now());
                   INSERT INTO `student_signs` (`sign_id`, `student_id`, `ranking_id`, `puntuation`, `created_at`) VALUES (13, NEW.student_id, NEW.ranking_id, 0, now());
                   INSERT INTO `student_signs` (`sign_id`, `student_id`, `ranking_id`, `puntuation`, `created_at`) VALUES (19, NEW.student_id, NEW.ranking_id, 0, now());
                   INSERT INTO `student_signs` (`sign_id`, `student_id`, `ranking_id`, `puntuation`, `created_at`) VALUES (25, NEW.student_id, NEW.ranking_id, 0, now());
                END');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('student_signs');
    }
};
