<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use Illuminate\Support\Str;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $event=Event::all();
        try {
             return
             response()->json([
                'code' => 200,
                'message'=>"recuperation reussi avec succes",
                'data' => $event
            ]);
        } catch (\Throwable $th) {

        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        Event::create([
            'title' => $request->name,
            'description' => $request->description,
            'catogory_id'=>$request->catogory,
            'slug'=>Str::slug($request->title),
            'extrait' => Str::limit($request->description,50),
            'image'=>$request->image,
            'date_debut'=>$request->date_debut,
            'date_fin'=>$request->date_fin,
            'lieu'=>$request->lieu,
            'heure'=>$request->heure
        ]);

        return response()->json([
            'code' => 204,
            'message'=>"creation reussi avec succes",
            'data' => $request->all()
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        try {
            return response()->json([
                'code' => 200,
                'message'=>"recuperation reussi avec succes",
                'data' => $event
             ]);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
         Event::update([
            $event->title => $request->title,
            $event->description => $request->description,
            $event->catogory_id=>$request->catogory,
            $event->slug=>Str::slug($request->title),
            $event->extrait => Str::limit($request->description,50),
            $event->image =>$request->image,
            $event->date_debut=>$request->date_debut,
            $event->date_fin=>$request->date_fin,
            $event->lieu=>$request->lieu,
            $event->heure=>$request->heure
         ]);
       $event->save();
       

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {

    }
}
