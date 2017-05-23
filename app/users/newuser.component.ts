import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {CustomValidators} from '/app/shared/customvalidators';

@Component({
    templateUrl: '/app/users/newuser.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class NewUser { 
    signupForm: ControlGroup;
    submitted = false;

    constructor(fb: FormBuilder){
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
        console.log(this.signupForm);
        this.submitted = true;
    }
}
