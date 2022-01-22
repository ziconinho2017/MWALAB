import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../characters/characters.component';
import { GotServicesService } from '../got-services.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  character !: Character;
  constructor(private route:ActivatedRoute, private gotServices:GotServicesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.gotServices.getCharacter(params['id']).then(character=>{
        console.log(character);
        this.character = character;
      })
    })
  }
}
