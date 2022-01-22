import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from './characters/characters.component';

@Injectable({
  providedIn: 'root'
})
export class GotApiService {
  #baseUrl: string = "https://thronesapi.com/api/";
  constructor(private http: HttpClient) { }
  public getCharacters() : Promise<Character[]>{
    const url: string = this.#baseUrl+"v2/Characters";
    return this.http.get(url).toPromise()
        .then(response=>response as Character[])
        .catch(this.handleError);
  }
  private handleError(error:any): Promise<any>{
    console.log(error);
    return Promise.reject(error.message() || error);
  }
}
