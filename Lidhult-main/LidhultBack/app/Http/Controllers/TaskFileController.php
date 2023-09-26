<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskFileController extends Controller
{
    public function create(Request $request) { // Actualiza un profesor

        try{
            
            DB::beginTransaction();
            $request->validate([
                'task_id' => 'required',
                'student_id' => 'required',
                'task' => 'required',
                'file_name' => 'required'
            ]);

            // Obtener el contenido de la imagen en base64 desde la solicitud
            $base64 = $request->task;
            
            if(str_contains($request->file_name, '.pdf')){

                $base64 = substr($base64, strpos($base64, ',') + 1);

            } 
            
                $decoded = base64_decode($base64);
                
                $filename = time() . '_' . $request->file_name;
                
                $path = public_path('tasks/' . $filename);

                file_put_contents($path, $decoded); 

            DB::table('task_files')->insert([
                'task_id' => $request->task_id,
                'student_id' => $request->student_id,
                'link' => $filename ,
                'puntuation' => 0 
            ]);
            DB::commit();
            
            return response()->json([
                "status" => 1,
                "msg" => "Se ha actualizado!",
            ]);

        } catch (Exception $e) {

            DB::rollBack();
            return response()->json([
                "status" => 0,
                "msg" => "  ! + $e",
            ]);
        }    
        
    }

    public function read(Request $request) { // Lee un estudiante

        try{

            $request->validate([    
                'id' => 'required'
            ]);

            $tasks = DB::select('select * FROM task_files WHERE student_id = ?',
            [$request->id]);

            return response()->json([
                "status" => 1,
                "msg" => "Vista exitosa!",
                "data" => $tasks,
            ]);

        } catch (Exception $e) {

            return response()->json([
                "status" => 0,
                "msg" => "No se ha encontrado! + $e",
            ]);

        }
    }

    public function update(Request $request) { // Actualiza un estudiante

        try{
            
            DB::beginTransaction();
            $request->validate([
                'task_id' => 'required',
                'student_id' => 'required',
                'task' => 'required',
                'file_name' => 'required',
            ]);

            $base64 = $request->task;
            
            if(str_contains($request->file_name, '.pdf')){

                $base64 = substr($base64, strpos($base64, ',') + 1);

            } 
            
                $decoded = base64_decode($base64);

                $image = DB::select('select link from task_files where task_id = ? and student_id = ?', [$request->task_id, $request->student_id]);
                unlink(public_path('tasks/'.$image[0]->link));

                // Generar un nombre de archivo único
                $filename = time() . '_' . $request->file_name;
                
                $path = public_path('tasks/' . $filename);

                file_put_contents($path, $decoded); 
            DB::update('update task_files set link = ? WHERE task_id = ?',
            [$filename, $request->task_id]);
            DB::commit();            
            
            return response()->json([
                "status" => 1,
                "msg" => "Se ha actualizado!",
            ]);

        } catch (Exception $e) {

            DB::rollBack();
            return response()->json([
                "status" => 0,
                "msg" => "No se ha podido actualizar! + $e",
            ]);
        }    
        
    }

    public function indexTareasRanking(Request $request) { // Lee un estudiante

        try{

            $request->validate([    
                'id' => 'required'
            ]);

            $tasks = DB::select('SELECT t.id, f.student_id, f.link, f.puntuation, t.name, t.date, s.nick
                                FROM task_files f
                                JOIN tasks t
                                JOIN students s
                                WHERE t.id = f.task_id
                                AND s.id = f.student_id
                                AND t.ranking_id = ?',
            [$request->id]); 

            return response()->json([
                "status" => 1,
                "msg" => "Vista exitosa!",
                "data" => $tasks
            ]);

        } catch (Exception $e) {

            return response()->json([
                "status" => 0,
                "msg" => "No se ha encontrado! + $e",
            ]);

        }
    }

    public function updatePuntuation(Request $request) { // Actualiza un estudiante

        try{
            
            DB::beginTransaction();
            $request->validate([
                'task_id' => 'required',
                'stud_id' => 'required',
                'puntuation' => 'required',
            ]);


            DB::update('update task_files set puntuation = ? WHERE task_id = ? AND student_id = ?',
            [$request->puntuation, $request->task_id, $request->stud_id]);
            DB::commit();            
            
            return response()->json([
                "status" => 1,
                "msg" => "Se ha actualizado!",
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
