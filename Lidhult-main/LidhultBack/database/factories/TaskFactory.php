<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            
            'ranking_id' => $this->faker->numberBetween(1, 10),
            'name' => $this->faker->text(10),
            'description' => $this->faker->text(20),
            'date' => $this->faker->date,

        ];
    }
}
