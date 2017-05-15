import {Component} from 'angular2/core';
import {MyNavbar} from '/app/navbar.component';

@Component({
    selector: 'my-app',
    template: '<my-navbar></my-navbar>',
    directives: [MyNavbar]
})
export class AppComponent { }
