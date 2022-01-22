import { Component, OnInit } from '@angular/core';

import { GotApiService } from '../got-api.service';

export class Character{
  #fullName!: string;
  #title!: string;
  get fullName() {return this.#fullName};
  get title() {return this.#title};
  constructor(fullName:string,title:string){
    this.#fullName = fullName;
    this.#title = title;
  }
}

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];
  constructor(private gotApiService:GotApiService) { }

  ngOnInit(): void {
    this.gotApiService.getCharacters().then(characters=>{
      this.characters = characters;
      console.log("Characters",this.characters);
    });
  }

}
