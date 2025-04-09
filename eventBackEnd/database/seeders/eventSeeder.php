<?php

namespace Database\Seeders;

use App\Models\Evenement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class eventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

     public function run(): void
    {
        $evenements = [
            [
                'title' => 'Concert Live - Nouvel Horizon',
                'description' => "Un concert vibrant avec des artistes locaux et internationaux.\nAmbiance garantie avec sons, lumières et food trucks.\nUne soirée inoubliable au cœur de Dakar.",
                'date' => '2025-05-10',
                'heure' => '19:00:00',
                'location' => 'Dakar',
                'category' => 'concert',
                'attendees' => 0,
            ],
            [
                'title' => 'Conférence Tech et Société',
                'description' => "Explorez l'impact des technologies sur nos sociétés modernes.\nDes experts viendront partager leurs recherches et visions.\nUn moment de réflexion et d'échanges ouverts.",
                'date' => '2025-06-15',
                'heure' => '10:00:00',
                'location' => 'Thiès',
                'category' => 'conférence',
                'attendees' => 0,
            ],
            [
                'title' => 'Atelier de création mobile avec Flutter',
                'description' => "Venez apprendre à créer une application mobile from scratch.\nDécouverte de Flutter, Dart, UI, navigation et backend.\nSession interactive, animée par des développeurs pro.",
                'date' => '2025-04-20',
                'heure' => '14:00:00',
                'location' => 'Kaolack',
                'category' => 'atelier',
                'attendees' => 0,
            ],
            [
                'title' => 'Exposition Art & Innovation',
                'description' => "Une exposition qui mélange art traditionnel et numérique.\nDécouvrez des œuvres interactives et immersives.\nL’occasion de voir la créativité à l’ère digitale.",
                'date' => '2025-05-22',
                'heure' => '11:00:00',
                'location' => 'Saint-Louis',
                'category' => 'exposition',
                'attendees' => 0,
            ],
            [
                'title' => 'Tournoi inter-universitaire de foot',
                'description' => "Un tournoi sportif réunissant les universités du pays.\nFairplay, compétition et esprit d’équipe au rendez-vous.\nVenez soutenir votre équipe locale !",
                'date' => '2025-05-05',
                'heure' => '16:00:00',
                'location' => 'Ziguinchor',
                'category' => 'sport',
                'attendees' => 0,
            ],
            [
                'title' => 'Formation Laravel avancée',
                'description' => "Un atelier de deux jours sur le framework Laravel.\nMiddleware, API REST, sécurité et bonnes pratiques.\nExercices pratiques et mini-projet final.",
                'date' => '2025-06-10',
                'heure' => '09:30:00',
                'location' => 'Kolda',
                'category' => 'informatique',
                'attendees' => 0,
            ],
            [
                'title' => 'Initiation à l’IA avec Python',
                'description' => "Découvrir les bases de l’intelligence artificielle en Python.\nManipulation de données, apprentissage supervisé, projets.\nAccessible aux débutants curieux de l’IA.",
                'date' => '2025-07-01',
                'heure' => '13:00:00',
                'location' => 'Dakar',
                'category' => 'IA',
                'attendees' => 0,
            ],
            [
                'title' => 'Conférence sur l’éthique de l’IA',
                'description' => "Quels sont les risques et les limites de l’IA ?\nDes chercheurs débattent des enjeux humains et sociaux.\nUn échange profond pour un futur responsable.",
                'date' => '2025-05-30',
                'heure' => '15:00:00',
                'location' => 'Fatick',
                'category' => 'conférence',
                'attendees' => 0,
            ],
            [
                'title' => 'Exposition photo "Regards Urbains"',
                'description' => "Une exposition photographique sur la vie dans les villes.\nDes clichés poignants et artistiques capturant l'instant.\nAccès libre et discussions avec les photographes.",
                'date' => '2025-04-25',
                'heure' => '10:00:00',
                'location' => 'Tambacounda',
                'category' => 'exposition',
                'attendees' => 0,
            ],
            [
                'title' => 'Hackathon IA pour l’environnement',
                'description' => "24h pour créer une solution IA au service de la planète.\nDes équipes pluridisciplinaires, des mentors, des prix.\nParticipez à l’innovation écoresponsable.",
                'date' => '2025-05-18',
                'heure' => '08:00:00',
                'location' => 'Saint-Louis',
                'category' => 'IA',
                'attendees' => 0,
            ],
        ];

        foreach ($evenements as $event) {
            Evenement::create($event);
        }
    }
}
