import { RecordsModel } from './../models/records-model';
import { Records } from './../interfaces/records';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http : HttpClient) { }

  getMusicRecord(url) : Observable<Records>{
    return this._http.get<any>(url)
    .pipe(
      map((records) => {
      return  new RecordsModel(records)
      })
    )
  }

}
