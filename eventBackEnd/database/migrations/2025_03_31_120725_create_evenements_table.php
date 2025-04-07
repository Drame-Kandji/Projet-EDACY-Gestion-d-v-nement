<?php

use App\Models\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('evenements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->date('date');
            $table->string('location');
            $table->time('heure');
            $table->string('image')->nullable()->default('https://www.evenement.com/wp-content/uploads/2019/09/samuel-pereira-uf2nnANWa8Q-unsplash-2.jpg');
            $table->string('category');
            $table->bigInteger('attendees')->default(0)->nullable();
           // $table->foreignIdFor(User::class, 'user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evenements');
    }
};
