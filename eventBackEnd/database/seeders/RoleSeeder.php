<?php

namespace Database\Seeders;

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
        Role::create(['name'=>'admin']);
        Role::create(['name'=>'user']);

        Permission::create(['name' => 'create events']);
        Permission::create(['name' => 'edit events']);
        Permission::create(['name' => 'delete events']);
        Permission::create(['name' => 'view events']);
        Permission::create(['name' => 'register for events']);

        $admin = Role::findByName('admin');
        $user = Role::findByName('user');
        $admin->givePermissionTo(['create events', 'edit events', 'delete events', 'view events', 'register for events']);
        $user->givePermissionTo(['view events', 'register for events']);

    }
}
