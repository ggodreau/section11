import {Control} from 'angular2/common';

export class CustomValidators {
    static validateEmail(control: Control){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid  = re.test(control.value);
        return valid ? null : {email: true};
        }

    static isBlank(control: Control){
        if (control.value.length == 0)
            return {isBlank: true};
        return null;
    }
}
