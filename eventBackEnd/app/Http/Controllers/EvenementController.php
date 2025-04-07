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
            $evenement = Evenement::create($request->validated());
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
            $evenement = Evenement::findOrFail($id);
            if ($evenement) {
                $evenement->update($request->all());
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

    public function search(Request $request)
    {
        $query = $request->query();

        if (!$query) {
            return response()->json([
                'status' => 400,
                'message' => 'Veuillez fournir un terme de recherche.'
            ], 400);
        }
        $queryValue = array_keys($query)[0];

        // Rechercher par titre, type ou lieu
        $evenements = Evenement::where('title', 'LIKE', "%$queryValue%")
            ->orWhere('category', 'LIKE', "%$queryValue%")
            ->orWhere('location', 'LIKE', "%$queryValue%")
            ->get();

        return response()->json([
            'status' => 200,
            'message' => 'Résultats de la recherche',
            'data' => $evenements
        ]);
    }

    public function filter(Request $request)
    {
        $category = $request->input();

    if (empty($category)) {
        return response()->json([
            'status' => 400,
            'message' => 'Veuillez spécifier une catégorie.'
        ], 400);
    }

    // Extraire la première clé de l'URL
    $categoryName = array_keys($category)[0];

    if (strtolower($categoryName) === 'tous') {
        $evenements = Evenement::all();
    } else {
        // on filtre par catégorie
        $evenements = Evenement::where('category', 'LIKE', "%$categoryName%")->get();
    }

    return response()->json([
        'status' => 200,
        'message' => 'Événements filtrés',
        'data' => $evenements
    ]);
    }



    // Liste des événements de l'utilisateur connecté
    public function mesEvenements()
    {
        $user = Auth::user();
        return response()->json([
            'evenements' => $user->evenements
        ]);
    }


    public function inscrire($id)
    {
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

        // if (!$user->evenements->contains($evenement->id)) {
        //     $user->evenements()->attach($evenement->id);
        //     // Mail::to($user->email)->send(new ConfirmationInscription($evenement, $user));
        //     Mail::raw('Test Laravel mail vers Gmail', function ($message) {
        //         $message->to('dramealiou13460@gmail.com')
        //                 ->subject('Ceci est un test');
        //     });
        // } else {
        //     return response()->json(['message' => 'Utilisateur déjà inscrit à cet événement'], 400);
        // }

        // return response()->json(['message' => 'Inscription réussie à l’événement']);

        if (!$user->evenements->contains($evenement->id)) {
            $user->evenements()->attach($evenement->id);

            // Envoi de l'email en mode 'log' pour tester
            // Mail::raw('Test Laravel mail vers Gmail', function ($message) use ($user) {
            //     $message->to('aliou.drame@univ-thies.sn')
            //             ->subject('Ceci est un test');
            // });

            // Optionnel : Si tu veux tester plus proprement, tu peux utiliser un mail personnalisé avec un Mailable
             Mail::to($user->email)->send(new ConfirmationInscription($evenement, $user));

            return response()->json(['message' => 'Inscription réussie et email envoyé']);
        } else {
            return response()->json(['message' => 'Utilisateur déjà inscrit à cet événement'], 400);
        }

    }

    public function desinscrire($id)
    {
        $user = Auth::user();
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
            $user->evenements()->detach($evenement->id);
            return response()->json(['message' => 'Désinscription réussie de l\'événement']);
        } else {
            return response()->json(['message' => 'Utilisateur non inscrit à cet événement'], 400);
        }
    }


}
