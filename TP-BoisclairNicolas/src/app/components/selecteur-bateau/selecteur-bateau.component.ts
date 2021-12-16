/*
* Autor : Nicolas Boisclair
* Version : 1.0.0 
*/

import { Component } from '@angular/core';
import { APIService } from '../../services/api.service';
import { Bateau } from '../../models/bateau';
import { Router } from '@angular/router';

@Component({
    selector: 'app-selecteur-bateau',
    templateUrl: './selecteur-bateau.component.html',
    styleUrls: ['./selecteur-bateau.component.scss'],
    providers: [APIService]
})
export class SelecteurBateauComponent {

    bateaux!: Array<Bateau>;
    bateau: Bateau;

    constructor(private apiService: APIService, private router: Router) {
        this.bateau = new Bateau();
    }

    /**
     * Appelle l'API en fonction du nom du bateau écrit par l'utilisateur
     * Entre tous les bateaux trouvés dans une table de bateau
     * @param {any} recherche 
     */
    obtenirListeBateaux(recherche: any) {
        if (recherche.value.length >= 3 && recherche.value.length < 40) {
            this.bateaux = this.apiService.obtenirListeBateauxBySearch(recherche.value);
        } else {
            this.bateaux = []; 
        }
    }
    
    /**
     * Appelle l'API en fonction de la référence du bateau choisi par l'utilisateur
     * @param {any} recherche Le texte dans le input de recherche
     */
    obtenirLongueurBateauChoisi(recherche: any) {
        let _bateau = this.trouverBateauChoisi(recherche.value);
        if (_bateau.ref != '') {
            this.bateau = this.apiService.obtenirBateauByRef(_bateau.ref);
        }
    }

    /**
     * Trouve le bateau choisi par l'utilisateur dans le input de recherche parmi la liste bateaux
     * @param {string} nom Le nom du bateau
     * @return L'objet Bateau choisi par l'utilisateur
     */
    trouverBateauChoisi(nom: string) {
        for (let i = 0; i < this.bateaux.length; i++) {
            const element: Bateau = this.bateaux[i];
            if (nom == element.name) {
                return element;
            }
        }

        return new Bateau();
    }

    /**
     * S'assure qu'il y a bien un bateau dans la variable bateau, puis va au prochain composant
     */
    bateauPret() {
        if (this.bateau.ref != '') {
            this.router.navigate(['/bateau', this.bateau.ref]);
        } else {
            window.confirm("Aucun bateau sélectionné. Si vous avez sélectionné un bateau, veuillez patienter quelques secondes avant d'appuyer sur 'confirmer'.");
        }
    }
}
