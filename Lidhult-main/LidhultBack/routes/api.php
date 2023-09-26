<?php

use App\Http\Controllers\CharacterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\Ranking_usersController;
use App\Http\Controllers\RankingController;
use App\Http\Controllers\RecordController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\Student_signController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskFileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('createProfessor', [ProfessorController::class, 'create']); // Crear profesor
Route::post('deleteProfessor', [ProfessorController::class, 'delete']); // Eliminar profesor
Route::post('updateProfessor', [ProfessorController::class, 'update']); // Actualizar profesor
Route::post('readProfessor', [ProfessorController::class, 'read']); // Leer profesor

Route::post('createStudent', [StudentController::class, 'create']); // Crea estudiante
Route::post('deleteStudent', [StudentController::class, 'delete']); // Eliminar estudiante
Route::post('updateStudent', [StudentController::class, 'update']); // Actualizar estudiante
Route::post('puntuation', [StudentController::class, 'puntuation']); // Modifica la puntuación total y el personaje del estudiante
Route::post('readStudent', [StudentController::class, 'read']); // Leer estudiante

Route::post('login', [LoginController::class, 'login']); // Iniciar sesión
Route::post('logout', [LoginController::class, 'logout']); // Cerrar sesión
Route::post('autoLogin', [LoginController::class, 'autoLogin']); // Iniciar sesión

Route::post('createRanking', [RankingController::class, 'create']); // Crear ranking
Route::post('deleteRanking', [RankingController::class, 'delete']); // Borrar ranking
Route::post('updateRanking', [RankingController::class, 'update']); // Actualizar ranking
Route::get('showStudentRanking/{id}', [RankingController::class, 'showStudentView']); // Mostrar rankings al estudiante
Route::get('showProfessorRanking/{id}', [RankingController::class, 'showProfessorView']); // Mostrar rankings al professor
Route::get('newCode/{id}', [RankingController::class, 'newCode']); // Actualizar código de ranking

Route::post('createRanking_user', [Ranking_usersController::class, 'create']); // Crear log de rankings
Route::post('updateRanking_user', [Ranking_usersController::class, 'update']); // Actualizar log de rankings
Route::post('deleteRanking_user', [Ranking_usersController::class, 'delete']); // Borrar log de rankings
Route::post('indexUsers', [Ranking_usersController::class, 'index']); // Mostrar estudiantes de ranking
Route::get('indexUsersUuu/{id}', [Ranking_usersController::class, 'indexAlf']); // Mostrar estudiantes de ranking ordenador alfabéticamente

Route::get('indexCharacters', [CharacterController::class, 'indexCharacters']); // Mostrar todos los personajes de los estudiantes
Route::get('indexBosses', [CharacterController::class, 'indexBosses']); // Mostrar todos los personajes de los profesores
Route::get('readCharacter/{id}', [CharacterController::class, 'search']); // Mostrar un personaje

Route::post('sendMessage', [MessageController::class, 'create']); // Enviar mensaje

Route::post('sendRequest', [RequestController::class, 'create']); // Enviar solicitud
Route::post('showRequest', [RequestController::class, 'read']); // Leer solicitud
Route::post('deleteRequest', [RequestController::class, 'delete']); // Eliminar solicitud

Route::post('createTask', [TaskController::class, 'create']); // Crear tarea
Route::post('updateTask', [TaskController::class, 'update']); // Actualizar tareas
Route::post('deleteTask', [TaskController::class, 'delete']); // Eliminar tareas
Route::post('indexTask', [TaskController::class, 'index']);

Route::post('createTaskFile', [TaskFileController::class, 'create']);
Route::post('indexFile', [TaskFileController::class, 'read']);
Route::post('updateFile', [TaskFileController::class, 'update']);
Route::post('indexTareasRanking', [TaskFileController::class, 'indexTareasRanking']);
Route::post('updatePuntuation', [TaskFileController::class, 'updatePuntuation']);

Route::post('indexSkills', [Student_signController::class, 'index']);
Route::post('updateSkills', [Student_signController::class, 'update']);

Route::post('index', [RecordController::class, 'index']);
Route::post('filterIndex', [RecordController::class, 'filterIndex']);
Route::post('dateIndex', [RecordController::class, 'dateIndex']);
Route::post('deleteRecord', [RecordController::class, 'delete']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


