import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './team/team.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { FooterComponent } from './footer/footer.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { EditteamComponent } from './editteam/editteam.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditplayerComponent } from './editplayer/editplayer.component';



@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    TeamComponent,
    NavigatorComponent,
    FooterComponent,
    AboutusComponent,
    HomeComponent,
    EditteamComponent,
    EditplayerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot([
      {
        path : '',
        component : HomeComponent
      },
      {
        path : 'home',
        component : HomeComponent
      },
      {
        path : 'teams',
        component : TeamsComponent
      },
      {
        path : 'team/:teamId/players',
        component : TeamComponent
      },
      {
        path : 'team/:teamId/edit',
        component : EditteamComponent
      },
      {
        path : 'Player/:teamId/:playerId',
        component : EditplayerComponent
      },
      {
        path : 'aboutus',
        component : AboutusComponent
      },
      {
        path : '**',
        component : TeamComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
