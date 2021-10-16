import { Album } from "../interfaces/album";
import { Artist } from "../interfaces/artist";

export class AlbumModel implements Album {
    album_title: string;
    year: number;
    condition: string;
    artist: Artist;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}