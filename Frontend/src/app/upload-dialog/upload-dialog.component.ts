import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit {

  constructor(private songService: SongService) { }

  ngOnInit() {
  };

  private selectedFile: File;

  @Input() isVisible: Boolean;

  @Output() closeBtnClicked = new EventEmitter();  
  @Output() applyBtnClicked = new EventEmitter();
  
  close(): void {
    this.closeBtnClicked.emit();
  };  

  onFileChange(event): void {
    
    console.log(event);
    
    let fileList: FileList = event.target.files
    let file: File = fileList[0];
    this.selectedFile = fileList[0];       
  }

  apply(): void {
    if (this.selectedFile == null) 
    {
      alert("Вы не выбрали файл");
      return;
    }

    this.songService.add(this.selectedFile)
      .then(() => this.applyBtnClicked.emit())
      .catch(() => alert("Загрузка файла не удалась"));

    
  }
}
