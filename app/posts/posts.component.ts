import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {PostsService} from '/app/posts/posts.service';
import {Spinner} from '/app/shared/spinner.component';

@Component({
    template: `
        <h1>PostsComponent</h1>
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <spinner [isVisible]="isLoading"></spinner>
                    <ul *ngIf="!isLoading" class="list-group posts">
                        <li 
                            *ngFor="#post of posts" 
                            class="list-group-item"
                            (click)="onClick(post.id)">{{ post.title }}</li>
                    </ul>
                </div>
                <div class="col-md-6 col-lg-3">
                    <div 
                        *ngIf="currentPost"
                        class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">{{ posts[currentPost - 1].title }}</h3>
                        </div>
                        <div class="panel-body">
                            {{ posts[currentPost - 1].body }} 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        ,
    styles: [`
        .posts li { cursor: default; }
        .posts li:hover { background: #4c4c4c; }   
        .list-group-item.active,
        .list-group-item.active:hover,  
        .list-group-item.active:focus {   
             background-color:  #ecf0f1;
             border-color:  #ecf0f1;    
             color: #2c3e50;
        }
    `],
    directives: [ROUTER_DIRECTIVES, Spinner],
    providers: [PostsService, HTTP_PROVIDERS]

})
export class Posts implements OnInit { 
    isLoading = true;
    posts: array;
    currentPost = false;

    constructor(private _postsService: PostsService){}

    ngOnInit(){
        this._postsService.getPosts()
            .subscribe(res => {
                this.posts = res;
                this.isLoading = false;});
    }

    onClick(postId){
        // currentPost starts as false, then becomes
        // int when assigned. Needs -1 for json
        // indexing to display correct post/title
        this.currentPost = postId;
    }

}
