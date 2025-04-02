<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function assignRole(Request $request, $id)
{
    $user = User::findOrFail($id);

    // Vérifier que le rôle existe avant de l'assigner
    if (!in_array($request->role, ['admin', 'user'])) {
        return response()->json(['message' => 'Rôle invalide'], 400);
    }

    $user->assignRole($request->role);

    return response()->json([
        'status' => 200,
        'message' => "Rôle '{$request->role}' attribué avec succès à {$user->name}"
    ]);
}

    public function checkRole()
    {
        $user = Auth::user();

        if ($user && $user->User::hasRole('admin')) {
            return response()->json(['message' => 'Vous êtes admin']);
        }

        return response()->json(['message' => 'Vous êtes un utilisateur simple']);
    }

}
