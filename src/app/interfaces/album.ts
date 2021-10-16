import { Artist } from "./artist";

export interface Album {
    album_title: string;
    year: number;
    condition: string;
    artist: Artist
}