import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../get-data.service';
import { Team } from '../teams/teams.component';

@Component({
  selector: 'app-editteam',
  templateUrl: './editteam.component.html',
  styleUrls: ['./editteam.component.css']
})
export class EditteamComponent implements OnInit {
  team !: Team; 
  name !: String;
  rank !: Number;
  matchplayed !: Number;
  teamId !: String | null;
  showError : Boolean = true;
  showSuccess : Boolean = true;
  FormData!: FormGroup;
  errMsg !: String;
  successMsg !: String;
  constructor(private builder:FormBuilder, private getData : GetDataService, private _ActivatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      rank: new FormControl('', [Validators.required]),
      name:  new FormControl('', [Validators.required]),
      matchplayed: new FormControl('', [Validators.required])});
    this.teamId = this._ActivatedRoute.snapshot.paramMap.get("teamId");
    this.getData.getTeam(this.teamId)
        .then(resolve => this._setTeam(resolve))
        .catch(this._errorHandle)
  }
  private _setTeam(team : Team){
    console.log(team);
    this.team = team;
    this.name = team.name;
    this.rank = team.rank;
    this.matchplayed = team.matchplayed;
  }
  private _errorHandle(){
    this.errMsg = "Error occured";
    this.showError = false;
    this.showSuccess = true;
  }
  public onSubmit(formData : any){
    console.log(formData);
    this.getData.updateTeam(formData,this.teamId)
    .then(response=>this.setSucces("Team updated Successfully"))
    .catch(this._errorHandle);
  }
  private setSucces(msg : String){
    this.successMsg = msg;
    this.showError = true;
    this.showSuccess = false;
  }
}
