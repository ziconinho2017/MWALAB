import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../get-data.service';
import { Team } from '../teams/teams.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
export class Player{
  #_id !: String;
  #name !: String;
  #age !: Number;
  get _id(){return this.#_id}
  get name(){return this.#name}
  get age(){return this.#age}
  constructor(name : String,age:Number){
    this.#name = name;
    this.#age = age;
  }
}
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  team !: Team;
  players : Player[] = [];
  teamId !: String | null;
  errMsg !: String;
  FormData!: FormGroup;
  successMsg !: String;
  showError : Boolean = true;
  showSuccess : Boolean = true;
  constructor(private builder:FormBuilder, private _ActivatedRoute : ActivatedRoute, private getData : GetDataService) { }
  ngOnInit(): void {
    this.FormData = this.builder.group({
      age: new FormControl('', [Validators.required]),
      name:  new FormControl('', [Validators.required]),
      teamid: new FormControl('', [Validators.required])});
    this.teamId = this._ActivatedRoute.snapshot.paramMap.get("teamId");
    this.getData.getTeam(this.teamId)
        .then(resolve => this._setTeam(resolve))
        .catch(this._errorHandle)

  }
  private _setTeam(team : Team){
    console.log(team);
    this.team = team;
    this.players = team.players as Player[];
  }
  public onSubmit(formData : any){
    console.log(formData);
    this.getData.addPlayer(formData,this.teamId).then(response=>this.setSucces("Player added successfully"))
    .catch(this._errorHandle);
  }
  private setSucces(msg : String){
    this.successMsg = msg;
    this.showError = true;
    this.showSuccess = false;
    setTimeout(
      ()=>window.location.reload(),2000
    );
  }
  private _errorHandle(){
    this.errMsg = "Error occured";
    this.showError = false;
    this.showSuccess = true;
    setTimeout(
      ()=>window.location.reload(),2000
    );
  }
  public deletePlayer(teamId:String | null,playerId:String){
    this.getData.deletePlayer(teamId,playerId).then(response=>this.setSucces("Player Deleted Successfully"))
    .catch(this._errorHandle);
  }
}
