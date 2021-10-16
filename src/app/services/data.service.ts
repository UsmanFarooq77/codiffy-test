import { RecordsModel } from './../models/records-model';
import { AlbumModel } from './../models/album-model';

import { Injectable } from '@angular/core';
import { title } from 'process';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album } from '../interfaces/album';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  musicRecords: Album[];
  updatedValue: Album;
  updatedMusicRecords: Album[];
  musicRecord: Album;
  musicArtistName: string;
  index: number;

  private $musicRecordBehaviorSubject = new BehaviorSubject<any[]>([]);
  public $recordBehaviourSubject = new BehaviorSubject<{}>('');
  public records = new RecordsModel();
  nextPage: boolean;
  isNextPage: boolean;
  isPreviousPage: boolean;
  updatedMusicRecordsNextPage: Album[];

  constructor(private _api: ApiService) {
    this.musicRecords = [];
    this.updatedMusicRecords = [];
    this.updatedMusicRecordsNextPage = [];
    this.musicArtistName = "";
    this.index = 0;
    this.isPreviousPage = false;
    this.isNextPage = true;
  }

  getMusicRecord(url): any {

    this._api.getMusicRecord(url).subscribe((musicRecords) => {
      this.records = musicRecords;
      this.musicRecords = musicRecords['results'];
      // this.musicRecords.map((records) => new AlbumModel(records));
      if (!this.updatedValue) {
        this.$musicRecordBehaviorSubject.next(this.musicRecords);
      }
      else {
        if (this.isNextPage) {
          if (this.musicArtistName != this.updatedValue.artist.name) {
            for (let i = 0; i < this.updatedMusicRecords.length - 1; i++) {
              if (this.musicArtistName == this.updatedMusicRecords[i].artist.name) {
                this.updatedMusicRecords[i].artist.name = this.updatedValue.artist.name;
              }
            }
            this.updatedMusicRecords[this.index] = this.updatedValue;
            this.$musicRecordBehaviorSubject.next(this.updatedMusicRecords);
          }
          else {
            this.updatedMusicRecords[this.index] = this.updatedValue;
            this.$musicRecordBehaviorSubject.next(this.updatedMusicRecords);
          }
        }
        else {
          if (this.musicArtistName != this.updatedValue.artist.name) {
            for (let i = 0; i < this.updatedMusicRecordsNextPage.length - 1; i++) {
              if (this.musicArtistName == this.updatedMusicRecordsNextPage[i].artist.name) {
                this.updatedMusicRecordsNextPage[i].artist.name = this.updatedValue.artist.name
              }
            }
            this.updatedMusicRecordsNextPage[this.index] = this.updatedValue;
            this.$musicRecordBehaviorSubject.next(this.updatedMusicRecordsNextPage);
          }
          else {
            this.updatedMusicRecordsNextPage[this.index] = this.updatedValue;
            this.$musicRecordBehaviorSubject.next(this.updatedMusicRecordsNextPage);
          }
        }

      }
    });
  }
  pullMusicRecords(): Observable<Album[]> {
    return this.$musicRecordBehaviorSubject.asObservable();
  }

  updateRecord(musicRecord: Album, index: number, musicRecords: Album[]) {
    // this.$recordBehaviourSubject.next(musicRecord);
    this.musicArtistName = musicRecord.artist.name;
    if (this.isNextPage) {
      this.updatedMusicRecords = musicRecords;
      this.$recordBehaviourSubject.next(musicRecord);
    }
    else {
      this.updatedMusicRecordsNextPage = musicRecords;
      this.$recordBehaviourSubject.next(musicRecord);
    }
    this.index = index;
  }
  pullUpdateRecord(): Observable<any> {
    return this.$recordBehaviourSubject.asObservable();
  }
  getUpdatedRecord(value: Album) {
    this.updatedValue = value;
  }
  getMusicRecordPrevious(url) {
    this._api.getMusicRecord(url).subscribe((records) => {
      if (!this.updatedValue) {
        this.musicRecords = records.results;
        this.$musicRecordBehaviorSubject.next(this.musicRecords)
      }
      else {
        if (this.updatedMusicRecords.length) {
          this.musicRecords = this.updatedMusicRecords;
          this.$musicRecordBehaviorSubject.next(this.musicRecords);
        }
        else {
          this.$musicRecordBehaviorSubject.next(records.results);
        }
      }
    });
  }
  getMusicRecordNext(url: string, next: boolean) {
    this.nextPage = next;
    this._api.getMusicRecord(url).subscribe((records) => {
      this.musicRecords = records.results;
      this.$musicRecordBehaviorSubject.next(this.musicRecords)
    });
    this._api.getMusicRecord(url).subscribe((records) => {
      if (!this.updatedValue) {
        this.musicRecords = records.results;
        this.$musicRecordBehaviorSubject.next(this.musicRecords)
      }
      else {
        if (this.updatedMusicRecordsNextPage.length) {
          this.musicRecords = this.updatedMusicRecordsNextPage;
          this.$musicRecordBehaviorSubject.next(this.musicRecords);
        }
        else {
          this.$musicRecordBehaviorSubject.next(records.results);
        }
      }
    });
  }
}

