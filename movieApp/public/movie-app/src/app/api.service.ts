import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last, lastValueFrom, Observable } from 'rxjs';
import { Movie } from './movies/movies.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  #baseUrl = "http://localhost:3000/api/";
  constructor(private http : HttpClient) { }
  public getMovies():Promise<Movie[]>{
    const url = this.#baseUrl+"movies";
    return this.http.get(url).toPromise()
    .then(response=> response as Movie[])
    .catch(this.handleError);
  }
  public getMovie(movieId:String | null):Promise<Movie>{
    const url = this.#baseUrl+"movies/"+movieId;
    return this.http.get(url).toPromise()
            .then(response => response as Movie)
            .catch(this.handleError);
  }
  public deleteMovie(movieId:String | null){
    const url = this.#baseUrl+"movies/"+movieId;
    return lastValueFrom(this.http.delete(url))
           .then(response => response)
           .catch(this.handleError);
  }
  public handleError(error:any):Promise<any>{
    return Promise.reject(error.message || error);
  }
}
