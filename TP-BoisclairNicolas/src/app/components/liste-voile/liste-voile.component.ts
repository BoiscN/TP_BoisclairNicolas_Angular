/*
* Autor : Nicolas Boisclair
* Version : 1.0.0 
*/

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Voile } from '../../models/voile';
import { APIService } from '../../services/api.service';

@Component({
    selector: 'app-liste-voile',
    templateUrl: './liste-voile.component.html',
    styleUrls: ['./liste-voile.component.scss'],
    providers: [APIService]
})
export class ListeVoileComponent {

    voiles!: Array<Voile>;
    mesures: any = {};

    constructor(private apiService: APIService, private activatedRoute: ActivatedRoute, private router: Router) {
        this.activatedRoute.queryParams.subscribe(param => {
            this.voiles = apiService.obtenirListeVoile(param['gvl'], param['gvsl'], param['gve'], param['gm'], param['ge'], param['ss'], param['sa'], param['gs'], param['length']); /* Appelle la troisième API avec les paramètres de l'URL */

            /* Envoie les mesures dans un dictonnaire */
            for (let key in param) {
                let value: any = param[key];
                this.mesures[key] = value;
            }
        });
    }

    /**
     * Sert à avoir les voiles reçues par la troisième API de même type que celui envoyé en paramètre
     * @param {string} type le type reçu en paramètre
     * @returns les voiles dont le type est pareil que le paramètre type
     */
    voilesParTypes(type: string): Array<Voile> {
        let voiles = Array<Voile>();

        this.voiles.forEach(voile => {
            if (voile.type === type) {
                voiles.push(voile);
            }
        });
        
        return voiles;
    }

    /**
     * Retourne au composant précédent (selecteur-mesure), puis envoi les mesures en "state"
    */
    retourArriere() {
        this.router.navigate(['/bateau/'], {state: [this.mesures]});
    }
}
