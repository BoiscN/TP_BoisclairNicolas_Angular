import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelecteurBateauComponent } from './components/selecteur-bateau/selecteur-bateau.component';
import { SelecteurMesureComponent } from './components/selecteur-mesure/selecteur-mesure.component';
import { ListeVoileComponent } from './components/liste-voile/liste-voile.component';
import { Erreur404Component } from './components/erreur404/erreur404.component';

const routes: Routes = [
  {
    path: '',
    component: SelecteurBateauComponent
  },
  {
    path: 'bateau/:ref',
    component: SelecteurMesureComponent
  },
  {
    path: 'liste-voile',
    component: ListeVoileComponent
  },
  {
    path: '**',
    component: Erreur404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
