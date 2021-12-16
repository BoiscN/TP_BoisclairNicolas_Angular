/*
* Autor : Nicolas Boisclair et Daniel Boisclair
* Version : 1.0.0
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bateau, Sails } from '../models/bateau';
import { Voile, Price } from '../models/voile';
import { __awaiter } from 'tslib';

@Injectable({
  providedIn: 'root'
})

export class APIService {
  host: string;
  httpOptions: { headers: HttpHeaders; };

  constructor(private httpClient : HttpClient) { 
    this.host = "https://iwa2021.edriki.com/api/";
    this.httpOptions = {
      headers: new HttpHeaders({ })
    };
  }

  /**
   * Appelle l'API en fonction de la recherche par nom de bateau pour obtenir des bateau
   * @param recherche Le nom du bateau qui sera appelé dans l'API
   * @returns Une array de bateaux reçu de l'API 
   */
  obtenirListeBateauxBySearch(recherche: string) {
    var bateaux = Array<Bateau>();

    this.httpClient.get(this.host + "Boat/Search/" + recherche).subscribe((results: any) => {
      if(results.status == "success" && results.response.count > 0) {
        results.response.datas.forEach((bateau: Bateau) => {
          bateaux.push(bateau);
        });
      } else {
        console.log(results.response.msg);
      }
    });

    return bateaux;
  }

  /**
   * Appelle l'API en fonction de la recherche par la référence d'un bateau
   * @param recherche  Le nom de la référence qui sera appelé dans l'API
   * @returns  Le bateau reçu par l'API par sa référence
   */
  obtenirBateauByRef(recherche: string) {
    var bateau: Bateau = new Bateau();

    this.httpClient.get(this.host + "Boat/ByRef/" + recherche).subscribe((results: any) => {
      if(results.status == "success" && results.response.count > 0) {
        let data = results.response.datas;
        let _bateau = new Bateau(data.ref, data.name, data.lengthm, data.sails);
        
        Object.assign(bateau, _bateau);
      } else {
        console.log(results.response.msg);
      }
    });

    return bateau;
  }

  /**
   * Appelle l'API en fonction de la recherche par les mesures des voiles
   * @param gvl Grand-voile lattée
   * @param gvsl Grand-voile semi-lattée
   * @param gve Grand-voile sur enrouleur
   * @param gm Génois sur mousquetons
   * @param ge Génois sur enrouleur
   * @param ss Spi symétrique
   * @param sa Spi asymétrique
   * @param gs Gennaker / code 0
   * @returns Toutes les voiles reçues par l'API
   */
  obtenirListeVoile(gvl: string, gvsl: string, gve: string, gm: string, ge: string, ss: string, sa: string, gs: string, lg: string) {
    var voiles = Array<Voile>();
    this.httpClient.get(
      this.host + "Item/Items" + "?gvl=" +
      gvl + "&gvsl=" +
      gvsl + "&gve=" +
      gve + "&gm=" +
      gm + "&ge=" +
      ge + "&ss=" +
      ss + "&sa=" +
      sa + "&gs=" +
      gs + "&length=" +
      lg).subscribe((results: any) => {
        if(results.status == "success" && results.response.count > 0) {
          results.response.datas.forEach((voile: Voile) => {
            voiles.push(voile);
          });
        } else {
          console.log(results.response.msg);
        }
    });

    return voiles;
  }
}