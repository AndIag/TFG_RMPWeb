import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Brand } from './entities/brand';
import { BrandService } from './services/brand.service';


export class BrandsComponent implements OnInit {
    brands: Brand[];

    constructor(
        private _router: Router,
        private _brandService: BrandService) { }

    getBrands() {
        this._brandService.getBrands(0,10).then(brands => this.brands = brands);
    }

    ngOnInit() {
        this.getBrands();
    }
}
