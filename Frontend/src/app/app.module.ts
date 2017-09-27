import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { SonglistComponent } from './songlist/songlist.component';
import { SongComponent } from './song/song.component';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { SearchBtnComponent } from './search-btn/search-btn.component';
import { HttpModule } from '@angular/http';

import { SongService } from './services/song.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SonglistComponent,
    SongComponent,
    UploadDialogComponent,
    SearchBtnComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [SongService],
  bootstrap: [AppComponent]
})
export class AppModule { }
