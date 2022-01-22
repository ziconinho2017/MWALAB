import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterComponent } from './character/character.component';
import { ContinentsComponent } from './continents/continents.component';
import { RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    CharactersComponent,
    CharacterComponent,
    ContinentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path : 'characters',
        component: CharactersComponent
      },
      {
        path : 'continents',
        component: ContinentsComponent
      },
      {
        path : 'characters/:id',
        component : CharacterComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
