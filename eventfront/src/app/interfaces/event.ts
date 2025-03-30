export interface Event {
    id: number;
    title: string;
    description?:string;
    date: string;
    location: string;
    heur_debut?:string;
    heur_fin?:string;
    image: string;
    category: string;
    attendees: number;
}
