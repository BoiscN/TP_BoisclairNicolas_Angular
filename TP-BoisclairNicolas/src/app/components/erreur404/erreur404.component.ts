/*
* Autor : Nicolas Boisclair
* Version : 1.0.0 
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-erreur404',
  templateUrl: './erreur404.component.html',
  styleUrls: ['./erreur404.component.scss']
})
export class Erreur404Component {


  page: any = this.router.url;

  constructor(private router: Router, private location: Location) { }
  
  revenirEnArriere() {
    this.location.back();
  }
}
