<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
        User::factory(1)->create();

        User::factory()->create([
        'firstname'=>'talla',
        'lastname'=>'diop',
        'email'=>'talla.diop@univ-thies.sn',
        'password'=>'1234',
        ])->assignRole('admin');
    }
}
