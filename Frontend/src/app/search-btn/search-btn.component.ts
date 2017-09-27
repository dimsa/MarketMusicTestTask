import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-btn',
  templateUrl: './search-btn.component.html',
  styleUrls: ['./search-btn.component.css']
})
export class SearchBtnComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Output() searchTextChanged = new EventEmitter<string>();

  search(text: string) {
    this.searchTextChanged.emit(text);
  }

}
