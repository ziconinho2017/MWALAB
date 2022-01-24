import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../get-data.service';
import { Player } from '../team/team.component';
@Component({
  selector: 'app-editplayer',
  templateUrl: './editplayer.component.html',
  styleUrls: ['./editplayer.component.css']
})
export class EditplayerComponent implements OnInit {
  name !: String;
  age !: Number;
  player !: Player;
  playerId !: String | null;
  teamId !: String | null;
  showError : Boolean = true;
  showSuccess : Boolean = true;
  FormData!: FormGroup;
  errMsg !: String;
  successMsg !: String;
  constructor(private builder:FormBuilder, private getData:GetDataService, private _ActivatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      name:  new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required])});
    this.teamId = this._ActivatedRoute.snapshot.paramMap.get("teamId");
    this.playerId = this._ActivatedRoute.snapshot.paramMap.get("playerId");
    this.getData.getPlayer(this.teamId,this.playerId)
        .then(resolve => this._setPlayer(resolve))
        .catch(this._errorHandle)
  }
  private _setPlayer(player : Player){
    console.log(player);
    this.player = player;
    this.name = player.name;
    this.age = player.age;
  }
  private _errorHandle(){
    this.errMsg = "Error occured";
    this.showError = false;
    this.showSuccess = true;
  }
  public onSubmit(formData : any){
    console.log(formData);
    this.getData.updatePlayer(formData,this.teamId,this.playerId)
    .then(response=>this.setSucces("Player updated Successfully"))
    .catch(this._errorHandle);
  }
  private setSucces(msg : String){
    this.successMsg = msg;
    this.showError = true;
    this.showSuccess = false;
  }
}
