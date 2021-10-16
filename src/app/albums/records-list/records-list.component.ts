import { RecordsModel } from './../../models/records-model';
import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/interfaces/album';

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css'],
})
export class RecordsListComponent implements OnInit {
  musicRecords: Album[];
  searchText : string;
  public records = new RecordsModel();
  url : string;
  recordsNextPage: string;
  recordsPreviousPage: string;
  urlPage2: string;
  
  constructor(
    private _router: Router,
    public _data : DataService) {
      this.musicRecords = [];
      this.searchText = "";
      this.url = 'https://gist.githubusercontent.com/mslosarek/feb16b9a1dae5f3b7868ff0e0674d1c1/raw/06e0e0efebdaca724b7b70720d6d63ceff3acb19/page1.json'
      this.urlPage2 =  "https://gist.githubusercontent.com/mslosarek/feb16b9a1dae5f3b7868ff0e0674d1c1/raw/5fbd01e387d34b3d3dbee8b616a7040ea72489df/page1.json"
  }

  ngOnInit() {
    console.log(this._data.isNextPage);
    console.log(this._data.isPreviousPage);
    if(this._data.isNextPage){
    this._data.getMusicRecord(this.url);
    }
    else {
      this._data.getMusicRecord(this.urlPage2);
    }
    this._data.pullMusicRecords().subscribe((data) => {
      this.musicRecords = data;
      this.recordsNextPage = this._data.records.nextPage;
      this.recordsPreviousPage = this.url;
    }); 
    
  }
  updateRecord(musicRecord : Album, index : number) {
    this._data.updateRecord(musicRecord, index, this.musicRecords);
    this._router.navigate(['/update-record/' + musicRecord.artist.id]);
  }
  previousPage(url : string){
    console.log(url)
    this._data.isNextPage = true;
    this._data.isPreviousPage = false;
    this._data.getMusicRecordPrevious(url);
  }
  nextPage(url : string){
    console.log(url)
    
    this._data.isPreviousPage = true;
    this._data.isNextPage = false;
    this._data.getMusicRecordNext(url,this._data.isNextPage);
  }
}
