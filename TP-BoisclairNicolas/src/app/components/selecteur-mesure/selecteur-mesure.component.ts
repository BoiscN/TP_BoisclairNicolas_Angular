/*
* Autor : Nicolas Boisclair
* Version : 1.0.0 
*/

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bateau } from '../../models/bateau';
import { APIService } from '../../services/api.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-selecteur-mesure',
    templateUrl: './selecteur-mesure.component.html',
    styleUrls: ['./selecteur-mesure.component.scss'],
    providers: [APIService]
})
export class SelecteurMesureComponent {

    bateau: Bateau;

    /* Toutes les inputs qui ont besoins d'êtres validés ou dont les informations sont importantes pour la suite */
    form = new FormGroup({
        gvl: new FormControl('', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]),
        gvsl: new FormControl('', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]),
        gve: new FormControl('', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]),
        gm: new FormControl('', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]),
        ge: new FormControl('', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]),
        ss: new FormControl('', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]),
        sa: new FormControl('', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]),
        gs: new FormControl('', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]),
        lg: new FormControl('', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]), // La longueur qui est non visible pour l'utilisateur
        // lb: new FormControl('', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]) Indisponible pour le moment
    })

    constructor(private apiService: APIService, private activatedRoute: ActivatedRoute, private router: Router) {
        let refBateau = String(this.activatedRoute.snapshot.paramMap.get('ref'));
        if (refBateau != 'noref') { /* S'il y a une référence de bateau, appelle la deuxième API avec la référence */
            this.bateau = apiService.obtenirBateauByRef(refBateau);
        } else if(Object.keys(history.state).length > 1) { /* Si l'utilisateur arrive du composant "liste-voile", reprend les informations précédente */
            this.bateau = new Bateau('', '', history.state.length, history.state);
        } else { /* S'il y a aucune référence, créer un bateau avec aucune valeurs */
            this.bateau = new Bateau();
        }
    }

    /**
     * Vérifie que les input sont valides : seulement les chiffres et les points sont acceptés
     * Si non, le input devient rouge avec un message d'erreur
     * @param {any} input la valeur entrée dans le input
     */
    validationInput(input: any) {
        if (!input.target.value.match(/^[0-9]*\.?[0-9]*$/)) {
            input.target.classList.add("is-invalid");
        } else {
            input.target.classList.remove("is-invalid");
        }
    }

    /**
     * Vérifie si le formulaire est valide. Si oui, passe au prochain composant, puis 
     * passe en paramètre toutes les mesures dans l'url
     */
    prochainComposant() {
        let controls = this.form.controls;

        if(this.form.valid) {
            this.router.navigate(
                ['/liste-voile'],
                {queryParams: {
                    gvl: controls['gvl'].value, 
                    gvsl: controls['gvsl'].value, 
                    gve: controls['gve'].value, 
                    gm: controls['gm'].value, 
                    ge: controls['ge'].value, 
                    ss: controls['ss'].value, 
                    sa: controls['sa'].value, 
                    gs: controls['gs'].value,
                    length: controls['lg'].value,
                    // lb: control['lb'].value Indisponible pour le moment
                }}
            );
        }
    }
}
