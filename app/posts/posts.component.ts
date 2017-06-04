import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    template: `
        <h1>PostsComponent</h1>
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <ul class="list-group">
                        <li class="list-group-item">hello, world!</li>
                    </ul>
                </div>
                <div class="col-md-6 col-lg-3">
                    foobar
                </div>
            </div>
        </div>
        `
        ,
    directives: [ROUTER_DIRECTIVES]
})
export class Posts { 


}
