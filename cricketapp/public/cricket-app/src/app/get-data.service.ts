import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { lastValueFrom } from 'rxjs';
import { Player } from './team/team.component';
import { Team } from './teams/teams.component';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  #baseUrl = "http://localhost:8080/api/";
  constructor(private http : HttpClient) { }
  public getTeams():Promise<Team[]>{
    const url = this.#baseUrl+"teams/";
    return lastValueFrom(this.http.get(url))
          .then(response => response as Team[])
          .catch(this.handleError);
  }
  public getTeam(teamId : String | null):Promise<Team>{
    const url = this.#baseUrl+"teams/"+teamId;
    return lastValueFrom(this.http.get(url))
          .then(response => response as Team)
          .catch(this.handleError);
  }
  public getPlayer(teamId : String | null,playerId : String | null):Promise<Player>{
    const url = this.#baseUrl+"teams/"+teamId+"/players/"+playerId;
    return lastValueFrom(this.http.get(url))
          .then(response => response as Player)
          .catch(this.handleError);
  }
  public addTeam(input : any){
    const url = this.#baseUrl+"teams/";
    return lastValueFrom(this.http.post(url,input,{responseType:'text'}))
            .then(response => response)
            .catch(this.handleError);
  }
  public addPlayer(input : any,teamId : String | null){
    const url = this.#baseUrl+"teams/"+teamId+"/players";
    console.log(url);
    return lastValueFrom(this.http.post(url,input,{responseType:'text'}))
            .then(response => response)
            .catch(this.handleError);
  }
  public deleteTeam(teamId : String | null){
    const url = this.#baseUrl+"teams/"+teamId;
    console.log(url);
    return lastValueFrom(this.http.delete(url))
            .then(response => response)
            .catch(this.handleError);
  }
  public updateTeam(input:any, teamId:String | null){
    const url = this.#baseUrl+"teams/"+teamId;
    return lastValueFrom(this.http.put(url,input))
            .then(response => response)
            .catch(this.handleError);
  }
  public deletePlayer(teamId : String | null, playerId : String | null){
    const url = this.#baseUrl+"teams/"+teamId+"/players/"+playerId;
    console.log(url);
    return lastValueFrom(this.http.delete(url))
            .then(response => response)
            .catch(this.handleError);
  }
  public updatePlayer(input:any, teamId:String | null,playerId : String | null){
    const url = this.#baseUrl+"teams/"+teamId+"/players/"+playerId;
    return lastValueFrom(this.http.put(url,input))
            .then(response => response)
            .catch(this.handleError);
  }
  private handleError(error : any):Promise<any>{
      return Promise.reject(error.message || error);
  }
}
