import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {UsersService} from '/app/users.service';

@Component({
    template: `
        <h1>UsersComponent</h1>
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="#user of users">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td><i class="glyphicon glyphicon-edit"></i></td>
                    <td><i class="glyphicon glyphicon-remove"></i></td>
                </tr>
            </tbody>
        </table>
        `,
    directives: [ROUTER_DIRECTIVES],
    providers: [UsersService, HTTP_PROVIDERS]

})
export class Users implements OnInit { 
    isLoading = true;
    users;

    constructor(private _usersService: UsersService){}

    ngOnInit(){
        this._usersService.getUsers()
            .subscribe(users => {
                this.isLoading = false;
                this.users = users;
                });
    }
}
