import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Company } from './entities/company';
import { CompanyService } from './services/company.service';


export class CompaniesComponent implements OnInit {
    companies: Company[];

    constructor(
        private _router: Router,
        private _companyService: CompanyService) { }

    getCompanies() {
        this._companyService.getCompanies(0,10).then(companies => this.companies = companies);
    }

    ngOnInit() {
        this.getCompanies();
    }
}
