import { Artist } from "../interfaces/artist";

export class ArtistModel implements Artist {
    name: string;
    id: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}