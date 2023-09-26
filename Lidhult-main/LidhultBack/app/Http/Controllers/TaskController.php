<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    
    public function create(Request $request) { // Crea una tarea

        try{
            
            DB::beginTransaction();
            $request->validate([
                'ranking_id' => 'required',
                'name' => 'required',
                'description' => 'required',
                'date' => 'required',
            ]);

            $task = new Task();
            $task->ranking_id = $request->ranking_id;
            $task->name = $request->name;
            $task->description = $request->description;
            $task->date = $request->date;
            $task->save();
            DB::commit();

            return response()->json([
                "status" => 1,
                "msg" => "Se ha insertado!",
            ]);

        } catch (Exception $e) {

            DB::rollBack();
            return response()->json([
                "status" => 0,
                "msg" => "No se ha podido insertar! + $e",
            ]);
        }
    }

    public function update(Request $request) { // Actualiza una tarea

        try{
            
            DB::beginTransaction();
            $request->validate([
                'id' => 'required',
                'name' => 'required',
                'description' => 'required',
                'date' => 'required',
            ]);      
            
            DB::update('update tasks set name = ?, description = ?, date = ? WHERE id = ?',
                [$request->name, $request->description, $request->date, $request->id]);
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

    public function delete(Request $request) { // Borra una tarea

        try{
            
            DB::beginTransaction();
            $request->validate([
                'id' => 'required',
            ]);

            DB::table('tasks')->where('id', $request->id)->delete();
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

    public function index(Request $request) { // Lee una tarea

        try{

            $request->validate([    
                'id' => 'required',
            ]);

            $task = DB::select('SELECT * 
                                FROM tasks 
                                WHERE ranking_id = ?',
            [$request->id]);

            return response()->json([
                "status" => 1,
                "msg" => "Vista exitosa!",
                "data" => $task,
            ]);

        } catch (Exception $e) {

            return response()->json([
                "status" => 0,
                "msg" => "No se ha encontrado! + $e",
            ]);

        }
    }
}
