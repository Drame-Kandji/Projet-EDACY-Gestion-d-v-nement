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
        //User::factory(1)->create();
        $this->call(RoleSeeder::class);
        User::factory()->create([
            "firstName"=> "ndongo",
            "lastName"=> "mbathie",
            "email"=>"ndongo.mbath@univ-thies.sn",
            "password"=>"ndongo042002"
        ])->assignRole('admin'); 
    }
}
