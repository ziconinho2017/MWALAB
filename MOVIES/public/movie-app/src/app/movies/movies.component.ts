import { Component, OnInit } from '@angular/core';
export class Movie {
  #title !: String;
  #year !: Number;
  #type !: String;
  #released !: String;
  #genres !: String;
  #directors !: String;
  


}
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
