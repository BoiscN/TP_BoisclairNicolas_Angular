import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelecteurBateauComponent } from './components/selecteur-bateau/selecteur-bateau.component';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SelecteurMesureComponent } from './components/selecteur-mesure/selecteur-mesure.component';
import { ListeVoileComponent } from './components/liste-voile/liste-voile.component';
import { Erreur404Component } from './components/erreur404/erreur404.component';

@NgModule({
  declarations: [
    AppComponent,
    SelecteurBateauComponent,
    SelecteurMesureComponent,
    ListeVoileComponent,
    Erreur404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
