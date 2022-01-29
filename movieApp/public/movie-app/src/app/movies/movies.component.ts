import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
export class Movie{
  _id !: string;
  title !: string;
  genre !: string;
  plot !: string;
  director !: [string];
  tomato !: [any];
}
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  Movies !: Movie[];
  constructor(private http : HttpClient,private getService : ApiService) { }

  ngOnInit(): void {
    this.getService.getMovies()
        .then(resolve => this.setMovies(resolve))
        .catch(this._errorHandle);
  }
  public setMovies(result:Movie[]){
    this.Movies = result;
  }
  public _errorHandle(){
    console.log("Error Occured");
  }
  public deleteMovie(movieId:string){
    this.getService.deleteMovie(movieId)
    .then(resolve=>this.successMsg())
    .catch(this._errorHandle)
  }
  public successMsg(){
    console.log("Delete Successfully");
    setTimeout(()=>window.location.reload(),2000);
  }
}
