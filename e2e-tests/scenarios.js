'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {


    it('should automatically redirect to /view-frame when location hash/fragment is empty', function () {
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toMatch("/view-frame");
    });


    describe('sidebar', function () {

        beforeEach(function () {
            browser.get('index.html#!/view-frame');
        });


        it('should render view-frame when user navigates to /view-frame', function () {
            expect(element.all(by.css('[ng-view] p')).first().getText()).toMatch(/partial for view 1/);
        });

    });


    describe('view-dashboard', function () {

        beforeEach(function () {
            browser.get('index.html#!/view-dashboard');
        });


        it('should render view-dashboard when user navigates to /view-dashboard', function () {
            expect(element.all(by.css('[ng-view] p')).first().getText()).toMatch(/partial for view 2/);
        });

    });
});
