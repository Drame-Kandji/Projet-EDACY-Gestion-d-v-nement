<?php

namespace Database\Seeders;

use App\RoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       foreach (RoleEnum::cases() as $role) {
              Role::create([
                'name' => $role->value,
              ]);
       }

       (Permission::create([
        'name' => 'create-event',
       ])
       );

       (Permission::create([
        'name' => 'delete-event',
       ]));

       (Permission::create([
        'name' => 'update-event',
       ]));

    }

}
