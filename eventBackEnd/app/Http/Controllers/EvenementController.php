<?php

namespace App\Http\Controllers;

use App\Mail\ConfirmationInscription;
use App\Models\Evenement;
use Illuminate\Http\Request;
use App\Http\Requests\StoreEvenementRequest;
use App\Http\Requests\UpdateEvenementRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Mail;

use function PHPUnit\Framework\returnSelf;

class EvenementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {   // Si "Tous" ou aucun type spécifié, récupérer tous les événements
            $evenements = Evenement::all();
            return response()->json([
                'status'=> 200,
                'message' => 'Liste des evenements',
                'data' => $evenements
            ]);
           }
        catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la récupération des événements',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEvenementRequest $request)
    {
        try {
            // dd($request->validated());
            $data=$request->validated();
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('evenements', 'public');
                $data['image'] = $imagePath; // on ajoute le chemin à sauvegarder en BDD
            }
            $evenement = Evenement::create($data);
            return response()->json([
                'status' => 200,
                'message' => 'Evenement créé avec succés',
                'data' => $evenement
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la création de l\'événement',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $evenement = Evenement::findOrFail($id);
            if ($evenement) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Evenement trouvé',
                    'data' => $evenement
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Evenement non trouvé'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la récupération de l\'événement',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEvenementRequest $request, string $id)
    {
        //dd($request->all());
        try {
            $data=$request->validated();
            $evenement = Evenement::findOrFail($id);
            if ($evenement) {
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('evenements', 'public');
                $data['image'] = $imagePath; // on ajoute le chemin à sauvegarder en BDD
            }
                $evenement->update($data);
                return response()->json([
                    'status' => 200,
                    'message' => 'Evenement mis à jour avec succés',
                    'data' => $evenement
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Evenement non trouvé'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la mise à jour de l\'événement',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $evenement = Evenement::findOrFail($id);
            if ($evenement) {
                $evenement->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Evenement supprimé avec succés'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Evenement non trouvé'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la suppression de l\'événement',
                'message' => $e->getMessage()
            ], 500);
        }
    }






    // Liste des événements de l'utilisateur connecté
    public function mesEvenements()
    {
        $user = Auth::user();
        return response()->json([
            'evenements' => $user->evenements
        ]);
    }

    public function participants($id)
    {
        $evenement = Evenement::with('users')->find($id);
        if (!$evenement) {
            return response()->json(['message' => 'Événement non trouvé'], 404);
        }
        return response()->json([
            'message' => 'Liste des participants',
            'participants' =>$evenement->users// ou juste 'data'
        ]);
    }


    public function inscrire($id)
    {

        $user = Auth::user();
        //dd($user->email);
        $roles = $user->roles;
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non authentifié'], 401);
        }
        if (!is_numeric($id)) {
            return response()->json(['message' => 'ID invalide'], 400);
        }


        $evenement = Evenement::find($id);
        if (!$evenement) {
            return response()->json(['message' => 'Événement non trouvé'], 404);
        }

        if (!$user->evenements->contains($evenement->id)) {
            //ceci n'est pas une erreur, je répéte cci n'est pas une erreur
            $user->evenements()->attach($evenement->id);

            Mail::to($user->email)->send(new ConfirmationInscription($evenement, $user));


            return response()->json(['message' => 'Inscription réussie et email envoyé']);
        } else {
            return response()->json(['message' => 'Utilisateur déjà inscrit à cet événement'], 400);
        }

    }

    // Désinscription d'un utilisateur à un événement

    public function desinscrire($id){
        $user = Auth::user();
        $roles = $user->roles;
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non authentifié'], 401);
        }
        if (!is_numeric($id)) {
            return response()->json(['message' => 'ID invalide'], 400);
        }

        $evenement = Evenement::find($id);
        if (!$evenement) {
            return response()->json(['message' => 'Événement non trouvé'], 404);
        }
        if ($user->evenements->contains($evenement->id)) {
            //ceci n'est pas une erreur, je répéte cci n'est pas une erreur
            $user->evenements()->detach($evenement->id);
             Mail::to($user->email)->send(new ConfirmationInscription($evenement, $user));
            return response()->json(['message' => 'Desinscription réussie et email envoyé']);
        } else {
            return response()->json(['message' => 'Utilisateur déjà inscrit à cet événement'], 400);
        }


    }
}
