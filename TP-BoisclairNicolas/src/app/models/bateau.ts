/*
* Autor : Nicolas Boisclair et Daniel Boisclair
* Version : 1.0.0 
*/

/**
 * Mesures d'une voile d'un bateau reçues à partir d'une API
 */
export interface Sails {
	gvsl?: number;
	gvl?: number;
	gve?: number;
	gm?: number;
	ge?: number;
	ss?: number;
	sa?: number;
	gs?: number;
}

/**
 * Informations d'un bateau reçues à partir d'une API
 */
export class Bateau {
	ref: string;
	name: string;
	lengthm: number;
	sails: Sails;

	constructor(ref: string = '', name: string = '', lengthm: number = 0, sails: Sails = {}) {
		this.ref = ref;
		this.name = name;
		this.lengthm = lengthm;
		this.sails = sails;
	}
}