import { Component, OnInit } from '@angular/core';
import { GotServicesService } from '../got-services.service';
export class Character{
  #id!:number;
  #firstName!:string;
  #lastName!:string;
  #fullName!:string;
  #title!:string;
  #family!:string;
  #imageUrl!:string;
  get id(){return this.#id}
  get firstName(){return this.#firstName}
  get lastName(){return this.#lastName}
  get fullName(){return this.#fullName}
  get title(){return this.#title}
  get family(){return this.#family}
  get imageUrl(){return this.#imageUrl}
  constructor(id:number,firstName:string,lastName:string,fullName:string,title:string,family:string,imageUrl:string){
    this.#id = id;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#fullName = fullName;
    this.#title = title;
    this.#family = family;
    this.#imageUrl = imageUrl;
  }
}
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];
  constructor(private gotService:GotServicesService) { }

  ngOnInit(): void {
    this.gotService.getCharacters()
        .then(resolve => this._setCharacters(resolve))
        .catch(this._errorHandler);
  }
  private _errorHandler():void{
    console.log("Error while getting character");
  }
  private _setCharacters(characters:Character[]) :void{
    this.characters = characters;
  }

}
