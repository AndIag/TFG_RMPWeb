import {Company} from '../entities/company';

import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

@Injectable()
export class CompanyService {
	companies: Company[];

	constructor(public http: Http) {}
	
	getCompanies(startIndex, count){
		this.http.get('http://localhost:9090/restmapla/companies')
			.map(res => res.json())
			.subscribe(
				data => this.companies = data,
				err => console.error('ERROR: ' + err),
				() => console.log('COMPLETE')
			)
		return Promise.resolve(this.companies);
	}
}
