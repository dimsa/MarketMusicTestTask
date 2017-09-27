import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {SongService} from '../services/song.service';
import {SongModel} from '../model/song.model';

@Component({
  selector: 'app-songlist',
  templateUrl: './songlist.component.html',
  styleUrls: ['./songlist.component.css']
})
export class SonglistComponent implements OnInit {

  constructor(private songService: SongService) { }

  songs: SongModel[];
  selectedSong: SongModel;
  isUploadDialogVisible: Boolean;
  private searchFilter: string;

  onPlaySongClicked(song: SongModel) {
    this.selectedSong = song;
  };

  onSearchTextChanged(text: string) {
    this.searchFilter = text;
    this.getSongs();
  }

  onCloseBtnClicked() {
    this.isUploadDialogVisible = false;
  };

  onApplyBtnClicked() {
    this.isUploadDialogVisible = false;
    this.getSongs();
  };
  
  onSongDeleteRequested(song: SongModel) {    
    this.songService.delete(song.id)
      .then(response => { this.getSongs(); } );        
  };

  onSongPlayRequested(song: SongModel) {
    if (this.selectedSong === song)
      this.selectedSong = null
    else
      this.selectedSong = song;
  };

  ngOnInit() {
    this.searchFilter = "";
    this.getSongs();
  };

  getSongs(): void {
    this.songService.getSongs()
      .then(songs => {
          this.songs = songs.filter(song => song.name.includes(this.searchFilter))

      });
  };

  addSongBtnClick(): void {
    this.isUploadDialogVisible = true;
  }


}
