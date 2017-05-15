import {Component} from 'angular2/core';
import {Injectable} from 'angular2/core';

@Injectable()
@Component({
    selector: 'my-navbar',
    template: '<h1>myNavbar hello!</h1>'
})
export class MyNavbar { }
