import {Brand} from '../entities/brand';

import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

@Injectable()
export class BrandService {
	brands: Brand[];

	constructor(public http: Http) {}

	getBrands(startIndex, count){
		this.http.get('http://localhost:9090/restmapla/brands')
			.map(res => res.json())
			.subscribe(
				data => this.brands = data,
				err => console.error('ERROR: ' + err),
				() => console.log('COMPLETE')
			)
		return Promise.resolve(this.brands);
	}
}
