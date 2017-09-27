import { Component, OnInit, EventEmitter, Output, Input, ViewEncapsulation } from '@angular/core';
import { SongModel } from '../model/song.model'

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SongComponent implements OnInit {

  @Input()model: SongModel;

  constructor() {

   }   

  get name(): string {
    return this.model.name;
  }

  get id(): number {
    return this.model.id;
  }

  get path(): string {
    return this.model.path;
  }

  playClick() {
    this.songPlayRequested.emit(this.model);
  }

  deleteClick() {
    this.songDeleteRequested.emit(this.model);
  }

  @Output() songPlayRequested = new EventEmitter<SongModel>();
  @Output() songDeleteRequested = new EventEmitter<SongModel>();

  ngOnInit() {
  }

}
