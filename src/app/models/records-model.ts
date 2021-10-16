import { Album } from "../interfaces/album";
import { Records } from "../interfaces/records";

export class RecordsModel implements Records {
    results : Album[];
    nextPage : string;
    previousPage : string;

    constructor (values : Object = {}){
        Object.assign(this,values);
    }
}