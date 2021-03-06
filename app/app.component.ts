import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {HomeComponent} from '/app/home.component';
import {MyNavbar} from '/app/navbar.component';
import {Posts} from '/app/posts/posts.component';
import {Users} from '/app/users/users.component';
import {UserForm} from '/app/users/userform.component';

@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/users', name: 'Users', component: Users },
    { path: '/users/form', name: 'UserForm', component: UserForm },
    { path: '/posts', name: 'Posts', component: Posts },
    { path: '/*other', name: 'Other', redirectTo: ['Home'] }
])

@Component({
    selector: 'my-app',
    template: `
        <my-navbar></my-navbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
        `,
    directives: [MyNavbar, ROUTER_DIRECTIVES]
})
export class AppComponent { }
