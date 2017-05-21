import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {ControlGroup, FormBuilder, Validators} from 'angular2/common';

@Component({
    templateUrl: '/app/newuser.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class NewUser { 
    signupForm: ControlGroup;

    constructor(fb: FormBuilder){
        this.signupForm = fb.group({
            name: ['', Validators.required],
            email: [],
            billing: fb.group({
                cardNumber: ['', Validators.required],
                expiry: ['', Validators.required]
            })
        });
    }
}
