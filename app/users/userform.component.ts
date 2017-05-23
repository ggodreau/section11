import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, CanDeactivate, Router, RouteParams} from 'angular2/router';
import {ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {CustomValidators} from '/app/shared/customvalidators';
import {HTTP_PROVIDERS} from 'angular2/http';
import {UsersService} from '/app/users/users.service';

@Component({
    templateUrl: '/app/users/userform.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UsersService, HTTP_PROVIDERS]
})
export class UserForm implements CanDeactivate, OnInit { 
    signupForm: ControlGroup;
    submitted = false;
    routeParams = [];
    userInfo = [];

    constructor(
        fb: FormBuilder, 
        private _usersService: UsersService,
        private _router: Router,
        private _routeParams: RouteParams){
            this.signupForm = fb.group({
                name: ['', Validators.required],
                email: ['', Validators.compose([
                       Validators.required,
                       CustomValidators.validateEmail,
                       CustomValidators.isBlank
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
    //        console.log(this.signupForm);
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
        this.userInfo = 
            {
              "id": 0,
              "name": "",
              "username": "",
              "email": "",
              "address": {
                "street": "",
                "suite": "",
                "city": "",
                "zipcode": "",
                "geo": {
                  "lat": "",
                  "lng": ""
                }
              },
              "phone": "",
              "website": "",
              "company": {
                "name": "",
                "catchPhrase": "",
                "bs": ""
              }
            };
        // pull in id from API and populate form fields on init
        this._usersService.getUser(this.routeParams.id).subscribe(x => this.userInfo = x);
    }

}
