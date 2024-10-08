<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class newstable extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        factory(\App\User::class, 10)->create([
            'name'	=> str_random(20),
            'email'	=> str_random(10) . '@anambas.gmail.com',
            'password'	=> Hash::make('12345678')
    ]);
    }
}
