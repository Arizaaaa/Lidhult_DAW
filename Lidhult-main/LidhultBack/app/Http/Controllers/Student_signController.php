<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Student_signController extends Controller
{

    public function index(Request $request) {

        $request->validate([
            'student_id' => 'required',
            'ranking_id' => 'required',
            'evaluator' => 'required',
        ]);

        $skills = DB::select('SELECT s.*, si.name, si.level, si.link, st.nick, st.name  AS student, r.skill_points
                              FROM student_signs s
                              JOIN signs si
                              JOIN students st
                              JOIN ranking_users r
                              WHERE s.student_id = ?
                              AND s.ranking_id = ?
                              AND s.sign_id = si.id
                              AND st.id = ?
                              AND r.student_id = ?
                              AND r.ranking_id = ?', 
                              [$request->student_id, $request->ranking_id, $request->student_id,$request->evaluator, $request->ranking_id]);
        
        return response()->json([
            "status" => 1,
            "msg" => "Vista exitosa!",
            "data" => $skills,
        ]);
    }

    public function update(Request $request) {
        
        try{
            
            DB::beginTransaction();

            $request->validate([
                'sign_id' => 'required',
                'last_evaluator' => 'required',
                'student_id' => 'required',
                'ranking_id' => 'required',
                'puntuation' => 'required',
            ]);

            $points = DB::select('select puntuation from student_signs where sign_id = ? and student_id = ? and ranking_id = ?',
            [$request->sign_id, $request->student_id, $request->ranking_id]);

            $points[0]->puntuation += (int)$request->puntuation;
            
            if($points[0]->puntuation >= 10000) {$lvl = 5;}
            else if($points[0]->puntuation >= 7000) {$lvl = 4;}
            else if($points[0]->puntuation >= 4000) {$lvl = 3;}
            else if($points[0]->puntuation >= 2000) {$lvl = 2;}
            else if($points[0]->puntuation >= 1000) {$lvl = 1;}
            else {$lvl = 0;}

            DB::update('UPDATE student_signs 
                        SET last_evaluator = ?, 
                        puntuation = ?, 
                        last_points = ?, 
                        ranking_id = ?,
                        sign_id = (
                            SELECT id
                            FROM signs
                            WHERE level = ?
                            AND name = (
                                SELECT name
                                FROM signs
                                Where id = ?
                            ))
                        WHERE sign_id = ? 
                        AND student_id = ? 
                        AND ranking_id = ?',
            [$request->last_evaluator,  $points[0]->puntuation, $request->puntuation, 
            $request->ranking_id, $lvl, $request->sign_id, $request->sign_id, 
            $request->student_id, $request->ranking_id]);

            DB::update('update ranking_users set skill_points = skill_points - ? WHERE ranking_id = ? AND student_id = ?', 
            [$request->puntuation, $request->ranking_id, $request->last_evaluator]);

            DB::commit();            

            return response()->json([
                "status" => 1,
                "msg" => "Se ha actualizado!",
                "data" => $lvl,
            ]);

        } catch (Exception $e) {

            DB::rollBack();
            return response()->json([
                "status" => 0,
                "msg" => "No se ha podido actualizar! + $e",
            ]);
        }    
    }
}
