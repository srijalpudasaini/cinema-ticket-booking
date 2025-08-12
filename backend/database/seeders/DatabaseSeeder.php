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
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password'=>'admin123',
            'phone'=>'9749403164',
            'role'=>'admin'
        ]);
        User::factory()->create([
            'name' => 'User',
            'email' => 'user@example.com',
            'password'=>'user123',
            'phone'=>'9810008986',
            'role'=>'user'
        ]);
        User::factory()->create([
            'name' => 'User 2',
            'email' => 'user2@example.com',
            'password'=>'user123',
            'phone'=>'9800008986',
            'role'=>'user'
        ]);
    }
}
