import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { Player } from '../team/team.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
export class Team {
  #_id !: String;
  #rank !: Number;
  #name !: String;
  #matchplayed !: Number;
  #players !: Player[];
  get _id(){return this.#_id};
  get rank(){return this.#rank};
  get name(){return this.#name};
  get matchplayed(){return this.#matchplayed};
  get players(){return this.#players};
  constructor(rank:Number, name:String, matchplayed:Number){
    this.#name = name;
    this.#rank = rank;
    this.#matchplayed = matchplayed;
  }
}
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  searchTerm !: string;
  term !: string;
  showError : Boolean = true;
  showSuccess : Boolean = true;
  FormData!: FormGroup;
  Teams : Team[] = [];
  errMsg !: String;
  successMsg !: String;
  constructor(private builder:FormBuilder, private getData : GetDataService) { }
  ngOnInit(): void {
    this.FormData = this.builder.group({
      rank: new FormControl('', [Validators.required]),
      name:  new FormControl('', [Validators.required]),
      matchplayed: new FormControl('', [Validators.required])});
    this.getData.getTeams().then(resolve => this._setTeams(resolve))
    .catch(this._errorHandle);
  }
  private _setTeams(Teams:Team[]){
    this.Teams = Teams;
  }
  private _errorHandle(){
    this.errMsg = "Error occured";
    this.showError = false;
    this.showSuccess = true;
    setTimeout(
      ()=>window.location.reload(),2000
    );
  }
  public onSubmit(formData : any){
    this.getData.addTeam(formData).then(response=>this.setSucces("Team added Successfully"))
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
  public deleteTeam(teamId:String){
    this.getData.deleteTeam(teamId).then(response=>this.setSucces("Team Deleted Successfully"))
    .catch(this._errorHandle);
  }
}
