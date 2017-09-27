import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { SongModel } from '../model/song.model';
import { SONGSMOCK } from '../model/songs.mock';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class SongService {

  private apiUrl = 'http://localhost:1977/api/songs';  // URL to web api

  constructor(private http: Http) { }

  getSongs(): Promise<SongModel[]> {
    return this.http.get(this.apiUrl).toPromise()
      .then(response => {
        return this.fixSongUrl(response.json() as SongModel[])
      })
      .catch(this.handleError);

  }

  private fixSongUrl(songs: SongModel[]) {
    var res = songs.slice();
    res.forEach(it => it.path = this.apiUrl + '/' + it.path);

    return res;
  }

  add(file: File): Promise<SongModel> {
    console.log(file);
    const url = this.apiUrl;

    let formData: FormData = new FormData();    
    formData.append('file', file, file.name);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let options = new RequestOptions();

    return this.http.post(url, formData, options)
      .toPromise()
      .then(response => { response.json() as SongModel } )
      .catch(this.handleError);
  };

  delete(id: number): Promise<SongModel> {
    const url = this.apiUrl + `/${id}`;

    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(response => { var obj = response.json() as SongModel; console.log(obj) } )
      .catch(this.handleError);
  };

  private headers = new Headers({ 'Content-Type': 'application/json' });

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  };
}

