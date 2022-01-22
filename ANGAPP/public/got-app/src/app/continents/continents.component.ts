import { Component, OnInit } from '@angular/core';
import { GotServicesService } from '../got-services.service';
export class Continent{
  #id!:number;
  #name!:string;
  get id(){return this.#id};
  get name(){return this.#name};
  constructor(id:number,name:string){
    this.#id = id;
    this.#name = name;
  }
}
@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.css']
})
export class ContinentsComponent implements OnInit {
  continents : Continent[] = [];
  constructor(private gotServices:GotServicesService) { }

  ngOnInit(): void {
    this.gotServices.getContinents().then(continents=>{
      console.log('Contiments '+continents);
      this.continents = continents;
    })
  }

}
