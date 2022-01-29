import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Movie } from '../movies/movies.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  Movie !: Movie;
  movieId !: string | null;
  constructor(private actRoute:ActivatedRoute, private http:HttpClient, private getData:ApiService) { }

  ngOnInit(): void {
    this.movieId = this.actRoute.snapshot.paramMap.get("movieId");
    this.getData.getMovie(this.movieId)
    .then(resolve=>this.setMovie(resolve))
    .catch(this.errorHandle)
  }
  private setMovie(movie : Movie){
    this.Movie = movie;
  }
  public errorHandle(){
    console.log("Error Occured");
  }

}
