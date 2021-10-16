import { ArtistModel } from './../../models/artist-model';
import { AlbumModel } from './../../models/album-model';
import { DataService } from './../../services/data.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  public album = new AlbumModel();
  public artist = new ArtistModel();

  constructor(
    private _data: DataService,
    private _router: Router) {
  }

  ngOnInit(): void {
    this._data.pullUpdateRecord().subscribe((updateRecord) => {
      this.album = updateRecord;
    });
  }
  onSubmit() {
    this._data.getUpdatedRecord(this.album);
    this._router.navigate(['/']);
  }

}
