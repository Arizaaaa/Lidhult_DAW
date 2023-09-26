<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Database\Console\Migrations\RollbackCommand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RecordController extends Controller
{
    public function index(Request $request) {

        try{

            $request->validate([   
                'ranking_id' => 'required',
                
            ]);

            $record = DB::select('SELECT r.*, s1.name AS evaluator_name, s2.name AS evaluated_name, s.name AS skill_name, s.level
                                 FROM record_signs r
                                 JOIN students s1 ON r.evaluator = s1.id
                                 JOIN students s2 ON r.evaluated = s2.id
                                 JOIN signs s
                                 WHERE r.ranking_id = ?
                                 AND s.id = r.sign_id',
             [$request->ranking_id]);
            

            return response()->json([
                "status" => 1,
                "msg" => "Vista exitosa!",
                "data" => $record,
               
            ]);

        } catch (Exception $e) {

            return response()->json([
                "status" => 0,
                "msg" => "No se ha encontrado! + $e",
            ]);
        }
    }

    public function filterIndex(Request $request) {
        
        try{

            $request->validate([   
                'ranking_id' => 'required',
                'last_evaluator' => '',
                'student_id' => '',
                'soft_skills' => '',
                'date1' => '',
                'date2' => '',
            ]);

            $base = 'SELECT rs.*, s1.name AS evaluator_name, s2.name AS evaluated_name, si.name AS skill_name, si.level
                    FROM record_signs AS rs
                    JOIN students s1 ON rs.evaluator = s1.id
                    JOIN students s2 ON rs.evaluated = s2.id
                    JOIN rankings AS ra ON rs.ranking_id = ra.id
                    JOIN signs AS si    ON rs.sign_id = si.id
                    WHERE rs.ranking_id = '.$request->ranking_id;

            if(isset($request->last_evaluator)) {$evaluator = ' AND s1.name LIKE "%'.$request->last_evaluator.'%"';}
            else {$evaluator = '';}

            if(isset($request->student_id)) {$evaluated = ' AND s2.name LIKE "%'.$request->student_id.'%"';}
            else {$evaluated = '';}

            if(isset($request->soft_skills)) {$skill = ' AND si.name LIKE "%'.$request->soft_skills.'%"';}
            else {$skill = '';}

            if(isset($request->date1) && isset($request->date2)) {$date = ' AND (rs.created_at BETWEEN "'.$request->date1.' 00:00:00" AND "'.$request->date2.' 23:59:59")';}
            else if(isset($request->date1) && !isset($request->date2)) {$date = ' AND (rs.created_at >= "'.$request->date1.' 00:00:00")';}
            else if(!isset($request->date1) && isset($request->date2)) {$date = ' AND (rs.created_at <= "'.$request->date2.' 23:59:59")';}
            else {$date = '';}

            $orderBy = ' ORDER BY s1.surnames DESC, s1.name;';

            $record = DB::select($base.$evaluator.$evaluated.$skill.$date.$orderBy);

            return response()->json([
                "status" => 1,
                "msg" => "Vista exitosa!",
                "data" => $record,
            ]);

        } catch (Exception $e) {

            return response()->json([
                "status" => 0,
                "msg" => "No se ha encontrado! + $e",
            ]);
        }
    }

    public function delete(Request $request) {

        try{
            
            DB::beginTransaction();
            $request->validate([
                'evaluator' => 'required',
                'evaluated' => 'required',
                'sign_id' => 'required',
                'ranking_id' => 'required',
                'points' => 'required',
                'created_at' => 'required',
            ]);

            $points = DB::select('select puntuation from student_signs where sign_id = ? and student_id = ? and ranking_id = ?', [$request->sign_id, $request->evaluated, $request->ranking_id]);

            $points[0]->puntuation -= (int)$request->points;
            
            if($points[0]->puntuation >= 10000) {$lvl = 5;}
            else if($points[0]->puntuation >= 7000) {$lvl = 4;}
            else if($points[0]->puntuation >= 4000) {$lvl = 3;}
            else if($points[0]->puntuation >= 2000) {$lvl = 2;}
            else if($points[0]->puntuation >= 1000) {$lvl = 1;}
            else {$lvl = 0;}

            DB::update('UPDATE student_signs 
                        SET last_evaluator = null, 
                        puntuation = puntuation - ?, 
                        sign_id = (SELECT id
                                FROM signs
                                WHERE level = ?
                                AND name = (SELECT name
                                            FROM signs
                                            Where id = ?
                                            )
                                )
                        WHERE student_id = ? 
                        AND ranking_id = ? 
                        AND sign_id = ?',
            [$request->points, $lvl, $request->sign_id, $request->evaluated, $request->ranking_id, $request->sign_id]);
            DB::update('update ranking_users set skill_points = skill_points + ? where ranking_id = ? and student_id = ?', [$request->points, $request->ranking_id, $request->evaluator]);
            DB::delete('delete from record_signs where evaluator = ? and evaluated = ? and sign_id = ? and ranking_id = ? and created_at = ?', [$request->evaluator, $request->evaluated, $request->sign_id, $request->ranking_id, $request->created_at]);
            DB::commit();
            
            return response()->json([
                "status" => 1,
                "msg" => "Se ha eliminado!",
            ]);

        } catch (Exception $e) {

            DB::rollBack();
            return response()->json([
                "status" => 0,
                "msg" => "No se ha podido eliminar! + $e",
            ]);
        }       

    }
}