<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('desenvolvedoras', function (Blueprint $table) {
            $table->id();
            $table->string('nome')->unique();
            $table->string('email')->unique();
            $table->string('pais');
            $table->string('site')->nullable();
            $table->string('descricao')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('desenvolvedoras');
    }
};
