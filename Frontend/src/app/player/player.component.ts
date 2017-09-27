import { Component, OnInit, Input } from '@angular/core';
import {SongModel } from '../model/song.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor() { }
  //@Input()song: SongModel;
  ngOnInit() {
    //this._songPath = "file:///C://market-music//frontend//app_data//song1.mp3";
  }

  @Input('song')
  set song(value: SongModel) {        
    this._song = value;
  };
  
  get songPath(): string {
    return this._song != null ? this._song.path : '';
  };

  get songName(): string {
    return this._song != null ? this._song.name : '';
  };

  private _song: SongModel;

}
