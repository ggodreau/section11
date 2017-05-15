import {Component} from 'angular2/core';
import {MyNavbar} from '/app/navbar.component';

@Component({
    selector: 'my-app',
    template: '<h1>Section 11 Final, Initial Commit</h1><my-navbar></my-navbar>',
    directives: [MyNavbar]
})
export class AppComponent { }
