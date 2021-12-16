/*
* Autor : Nicolas Boisclair
* Version : 1.0.0 
*/

/**
 * Prix d'une voile reçu à partir d'une API
 */
export interface Price {
	unitPrice?: number;
	measure?: number;
	length?: number;
	infos?: number;
}

/**
 * Informations d'une voile reçues à partir d'une API
 */
export class Voile {
	ref: number;
	name: string;
	type: string;
	description: string;
	price: Price;

	constructor(ref: number = 0, name: string = '', type: string = '', description: string = '', price: Price = {}) {
		this.ref = ref;
		this.name = name;
		this.type = type;
		this.description = description;
		this.price = price;
	}
}