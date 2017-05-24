import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, CanDeactivate, Router, RouteParams} from 'angular2/router';
import {ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {CustomValidators} from '/app/shared/customvalidators';
import {HTTP_PROVIDERS} from 'angular2/http';
import {UsersService} from '/app/users/users.service';
import {User} from '/app/users/user';

@Component({
    templateUrl: '/app/users/userform.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UsersService, HTTP_PROVIDERS, User]
})
export class UserForm implements CanDeactivate, OnInit { 
    signupForm: ControlGroup;
    submitted = false;
    routeParams = [];
    userInfo = new User();

    constructor(
        fb: FormBuilder, 
        private _usersService: UsersService,
        private _router: Router,
        private _routeParams: RouteParams){
            this.signupForm = fb.group({
                name: ['', Validators.required],
                email: ['', Validators.compose([
                       Validators.required,
                       CustomValidators.validateEmail
                       //CustomValidators.isBlank
                       ])],
                phone: [],
                address: fb.group({
                    street: [],
                    suite: [],
                    city: [],
                    zipcode: []
                })
            });
    }

    log(x){
        console.log(x);
    }

    submit(){
        this.submitted = true;
        console.log(this.signupForm.value);
        this._usersService.postUsers(this.signupForm.value)
            .subscribe(x => { 
                console.log("new ID of user is:", JSON.stringify(x));
                console.log("returned");
                this._router.navigate(['Users']);});
    }

    routerCanDeactivate(next, previous){
        if(this.signupForm.dirty)
            return confirm("Are you sure?");
    }

    ngOnInit(){
        this.routeParams = this._routeParams.params;
        if (this.routeParams.id == 'new'){
            console.log("newID");
            return;
        }
        else
            this._usersService.getUser(this.routeParams.id)
                .subscribe(
                    x => {
                        if (x.status == 404) {
                            console.log("404 not found!")
                        }
                        this.userInfo = x};);
    }

}
