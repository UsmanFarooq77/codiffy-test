import { Album } from "./album";

export interface Records {
    results: Album[];
    nextPage: string;
    previousPage: string;
}