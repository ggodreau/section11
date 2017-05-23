import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, CanDeactivate} from 'angular2/router';
import {ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {CustomValidators} from '/app/shared/customvalidators';

@Component({
    templateUrl: '/app/users/newuser.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class NewUser implements CanDeactivate { 
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
    //        console.log(this.signupForm);
        this.submitted = true;
    }

    routerCanDeactivate(next, previous){
        console.log("next", next.urlPath);
        console.log("previous", previous.urlPath);
        if(this.signupForm.dirty)
            return confirm("Are you sure?");
    }

}
