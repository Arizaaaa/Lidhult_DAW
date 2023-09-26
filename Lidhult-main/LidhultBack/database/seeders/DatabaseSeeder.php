<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Character;
use App\Models\Sign;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

         DB::table('characters')->delete();

        $characters = [

            [ 'name' => 'Eze', 'level' => '1', 'link' => '/images/common/Eze1.webp' ],
            [ 'name' => 'Eze', 'level' => '2', 'link' => '/images/common/Eze2.webp' ],
            [ 'name' => 'Eze', 'level' => '3', 'link' => '/images/common/Eze3.webp' ],
            [ 'name' => 'Eze', 'level' => '4', 'link' => '/images/common/Eze4.webp' ],
            [ 'name' => 'Eze', 'level' => '5', 'link' => '/images/common/Eze5.webp' ],
            [ 'name' => 'Eze', 'level' => '6', 'link' => '/images/common/Eze6.webp' ],
            [ 'name' => 'Eze', 'level' => '7', 'link' => '/images/common/Eze7.webp' ],
            [ 'name' => 'Vargas', 'level' => '1', 'link' => '/images/common/Vargas1.webp' ],
            [ 'name' => 'Vargas', 'level' => '2', 'link' => '/images/common/Vargas2.webp' ],
            [ 'name' => 'Vargas', 'level' => '3', 'link' => '/images/common/Vargas3.webp' ],
            [ 'name' => 'Vargas', 'level' => '4', 'link' => '/images/common/Vargas4.webp' ],
            [ 'name' => 'Vargas', 'level' => '5', 'link' => '/images/common/Vargas5.webp' ],
            [ 'name' => 'Vargas', 'level' => '6', 'link' => '/images/common/Vargas6.webp' ],
            [ 'name' => 'Vargas', 'level' => '7', 'link' => '/images/common/Vargas7.webp' ],
            [ 'name' => 'Lance', 'level' => '1', 'link' => '/images/common/Lance1.webp' ],
            [ 'name' => 'Lance', 'level' => '2', 'link' => '/images/common/Lance2.webp' ],
            [ 'name' => 'Lance', 'level' => '3', 'link' => '/images/common/Lance3.webp' ],
            [ 'name' => 'Lance', 'level' => '4', 'link' => '/images/common/Lance4.webp' ],
            [ 'name' => 'Lance', 'level' => '5', 'link' => '/images/common/Lance5.webp' ],
            [ 'name' => 'Lance', 'level' => '6', 'link' => '/images/common/Lance6.webp' ],
            [ 'name' => 'Lance', 'level' => '7', 'link' => '/images/common/Lance7.webp' ],
            [ 'name' => 'Selena', 'level' => '1', 'link' => '/images/common/Selena1.webp' ],
            [ 'name' => 'Selena', 'level' => '2', 'link' => '/images/common/Selena2.webp' ],
            [ 'name' => 'Selena', 'level' => '3', 'link' => '/images/common/Selena3.webp' ],
            [ 'name' => 'Selena', 'level' => '4', 'link' => '/images/common/Selena4.webp' ],
            [ 'name' => 'Selena', 'level' => '5', 'link' => '/images/common/Selena5.webp' ],
            [ 'name' => 'Selena', 'level' => '6', 'link' => '/images/common/Selena6.webp' ],
            [ 'name' => 'Selena', 'level' => '7', 'link' => '/images/common/Selena7.webp' ],
            [ 'name' => 'Atro', 'level' => '1', 'link' => '/images/common/Atro1.webp' ],
            [ 'name' => 'Atro', 'level' => '2', 'link' => '/images/common/Atro2.webp' ],
            [ 'name' => 'Atro', 'level' => '3', 'link' => '/images/common/Atro3.webp' ],
            [ 'name' => 'Atro', 'level' => '4', 'link' => '/images/common/Atro4.webp' ],
            [ 'name' => 'Atro', 'level' => '5', 'link' => '/images/common/Atro5.webp' ],
            [ 'name' => 'Atro', 'level' => '6', 'link' => '/images/common/Atro6.webp' ],
            [ 'name' => 'Atro', 'level' => '7', 'link' => '/images/common/Atro7.webp' ],
            [ 'name' => 'Magress', 'level' => '1', 'link' => '/images/common/Magress1.webp' ],
            [ 'name' => 'Magress', 'level' => '2', 'link' => '/images/common/Magress2.webp' ],
            [ 'name' => 'Magress', 'level' => '3', 'link' => '/images/common/Magress3.webp' ],
            [ 'name' => 'Magress', 'level' => '4', 'link' => '/images/common/Magress4.webp' ],
            [ 'name' => 'Magress', 'level' => '5', 'link' => '/images/common/Magress5.webp' ],
            [ 'name' => 'Magress', 'level' => '6', 'link' => '/images/common/Magress6.webp' ],
            [ 'name' => 'Magress', 'level' => '7', 'link' => '/images/common/Magress7.webp' ],
            [ 'name' => 'Baldran', 'level' => '1', 'link' => '/images/common/Baldran1.webp' ],
            [ 'name' => 'Baldran', 'level' => '2', 'link' => '/images/common/Baldran2.webp' ],
            [ 'name' => 'Eldora', 'level' => '1', 'link' => '/images/common/Eldora1.webp' ],
            [ 'name' => 'Eldora', 'level' => '2', 'link' => '/images/common/Eldora2.webp' ],
            [ 'name' => 'Eriole', 'level' => '1', 'link' => '/images/common/Eriole1.webp' ],
            [ 'name' => 'Eriole', 'level' => '2', 'link' => '/images/common/Eriole2.webp' ],
            [ 'name' => 'Ezra', 'level' => '1', 'link' => '/images/common/Ezra1.webp' ],
            [ 'name' => 'Ezra', 'level' => '2', 'link' => '/images/common/Ezra2.webp' ],
            [ 'name' => 'Ginryou', 'level' => '1', 'link' => '/images/common/Ginryou1.webp' ],
            [ 'name' => 'Ginryou', 'level' => '2', 'link' => '/images/common/Ginryou2.webp' ],
            [ 'name' => 'Lukroar', 'level' => '1', 'link' => '/images/common/Lukroar1.webp' ],
            [ 'name' => 'Lukroar', 'level' => '2', 'link' => '/images/common/Lukroar2.webp' ],
        ];

        foreach($characters as $character) { Character::create($character); }

        DB::table('signs')->delete();

        $signs = [

            [ 'name' => 'Responsabilidad', 'level' => '0', 'link' => '/images/common/Stamin-up0.webp' ],
            [ 'name' => 'Responsabilidad', 'level' => '1', 'link' => '/images/common/Stamin-up1.webp' ],
            [ 'name' => 'Responsabilidad', 'level' => '2', 'link' => '/images/common/Stamin-up2.webp' ],
            [ 'name' => 'Responsabilidad', 'level' => '3', 'link' => '/images/common/Stamin-up3.webp' ],
            [ 'name' => 'Responsabilidad', 'level' => '4', 'link' => '/images/common/Stamin-up4.webp' ],
            [ 'name' => 'Responsabilidad', 'level' => '5', 'link' => '/images/common/Stamin-up5.webp' ],
            [ 'name' => 'Cooperación', 'level' => '0', 'link' => '/images/common/Double_tap0.webp' ],
            [ 'name' => 'Cooperación', 'level' => '1', 'link' => '/images/common/Double_tap0.webp' ],
            [ 'name' => 'Cooperación', 'level' => '2', 'link' => '/images/common/Double_tap2.webp' ],
            [ 'name' => 'Cooperación', 'level' => '3', 'link' => '/images/common/Double_tap3.webp' ],
            [ 'name' => 'Cooperación', 'level' => '4', 'link' => '/images/common/Double_tap4.webp' ],
            [ 'name' => 'Cooperación', 'level' => '5', 'link' => '/images/common/Double_tap5.webp' ],
            [ 'name' => 'Autonomía e iniciativa', 'level' => '0', 'link' => '/images/common/Quick_revive0.webp' ],
            [ 'name' => 'Autonomía e iniciativa', 'level' => '1', 'link' => '/images/common/Quick_revive1.webp' ],
            [ 'name' => 'Autonomía e iniciativa', 'level' => '2', 'link' => '/images/common/Quick_revive2.webp' ],
            [ 'name' => 'Autonomía e iniciativa', 'level' => '3', 'link' => '/images/common/Quick_revive3.webp' ],
            [ 'name' => 'Autonomía e iniciativa', 'level' => '4', 'link' => '/images/common/Quick_revive4.webp' ],
            [ 'name' => 'Autonomía e iniciativa', 'level' => '5', 'link' => '/images/common/Quick_revive5.webp' ],
            [ 'name' => 'Gestión emocional', 'level' => '0', 'link' => '/images/common/Jugger-nog0.webp' ],
            [ 'name' => 'Gestión emocional', 'level' => '1', 'link' => '/images/common/Jugger-nog1.webp' ],
            [ 'name' => 'Gestión emocional', 'level' => '2', 'link' => '/images/common/Jugger-nog2.webp' ],
            [ 'name' => 'Gestión emocional', 'level' => '3', 'link' => '/images/common/Jugger-nog3.webp' ],
            [ 'name' => 'Gestión emocional', 'level' => '4', 'link' => '/images/common/Jugger-nog4.webp' ],
            [ 'name' => 'Gestión emocional', 'level' => '5', 'link' => '/images/common/Jugger-nog5.webp' ],
            [ 'name' => 'Habilidades de pensamiento', 'level' => '0', 'link' => '/images/common/Speed_cola0.webp' ],
            [ 'name' => 'Habilidades de pensamiento', 'level' => '1', 'link' => '/images/common/Speed_cola1.webp' ],
            [ 'name' => 'Habilidades de pensamiento', 'level' => '2', 'link' => '/images/common/Speed_cola2.webp' ],
            [ 'name' => 'Habilidades de pensamiento', 'level' => '3', 'link' => '/images/common/Speed_cola3.webp' ],
            [ 'name' => 'Habilidades de pensamiento', 'level' => '4', 'link' => '/images/common/Speed_cola4.webp' ],
            [ 'name' => 'Habilidades de pensamiento', 'level' => '5', 'link' => '/images/common/Speed_cola5.webp' ],            
        ];

        foreach($signs as $sign) { Sign::create($sign); }

        \App\Models\Professor::factory(10)->create();
        \App\Models\Student::factory(10)->create();
        \App\Models\Ranking::factory(10)->create();
        \App\Models\Task::factory(10)->create();
    }
}
