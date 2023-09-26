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
        Schema::create('record_signs', function (Blueprint $table) {
            $table->foreignId('evaluator')
                ->nullable()
                ->constrained('students')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('evaluated')
                ->nullable()
                ->constrained('students')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('sign_id')
                ->nullable()
                ->constrained('signs')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('ranking_id')
                ->nullable()
                ->constrained('rankings')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->integer('points');
            $table->timestamps();
        });

       DB::unprepared('CREATE TRIGGER add_record BEFORE UPDATE ON `student_signs` FOR EACH ROW
        BEGIN
            IF NEW.last_evaluator IS NOT NULL THEN
                INSERT INTO `record_signs` (`evaluator`, `evaluated`, `sign_id`, `points`, `ranking_id`, `created_at`)
                VALUES (NEW.last_evaluator, NEW.student_id, NEW.sign_id, NEW.last_points, NEW.ranking_id, now());
            END IF;
        END');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
