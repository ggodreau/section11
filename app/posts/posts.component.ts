import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {PostsService} from '/app/posts/posts.service';
import {UsersService} from '/app/users/users.service';
import {Spinner} from '/app/shared/spinner.component';

@Component({
    template: `
        <h1>Posts</h1>
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-lg-6">

                    <!-- Posts -->

                    <select #u (change)="dropdown(u.value)" class="form-control">
                        <option value="">Select a user...</option>
                        <option 
                            *ngFor="#user of users" 
                            value="{{ user.id }}">
                            {{ user.name }}
                        </option>
                    </select>

                    <spinner [isVisible]="postLoading"></spinner>
                    <ul *ngIf="!postLoading" class="list-group posts">
                        <li 
                            *ngFor="#post of posts" 
                            class="list-group-item"
                            (click)="postClick(post.id)">{{ post.title }}</li>
                    </ul>
                </div>
                <div class="col-md-6 col-lg-3">
                    <div 
                        *ngIf="currentPost"
                        class="panel panel-default">
                        <div *ngIf="!isDropped">
                            <div class="panel-heading">
                                <h3 class="panel-title">{{ posts[currentPost - 1].title }}</h3>
                            </div>
                            <div class="panel-body">
                                {{ posts[currentPost - 1].body }} 
                            </div>
                        </div> 

                        <!-- Comments -->

                        <div>
                            <spinner [isVisible]="commentLoading"></spinner>
                        </div>

                        <div
                            *ngFor="#comment of comments"
                            class="media">
                            <div class="media-left">
                                <a href="#">
                                    <img 
                                        class="media-object rcorners1"
                                        src="http://lorempixel.com/80/80/people?random={{ comment?.id }}"
                                        alt="...">
                                </a>
                            </div>
                            <div class="media-body">
                                <h4 class="media-heading">{{ comment?.name }}</h4>
                                {{ comment?.body }}
                            </div>
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
        .rcorners1 {
            border-radius: 100%;
            padding: 10px;
        }
        .dropdown { position: relative; }
    `],
    directives: [ROUTER_DIRECTIVES, Spinner],
    providers: [PostsService, UsersService, HTTP_PROVIDERS]

})
export class Posts implements OnInit { 
    postLoading = true;
    commentLoading;
    posts: array;
    currentPost = false;
    comments;
    users;
    isDropped = false;

    constructor(
        private _postsService: PostsService,
        private _usersService: UsersService){}

    ngOnInit(){
        this._postsService.getPosts()
            .subscribe(res => {
                this.posts = res;
                this.postLoading = false;});
        this._usersService.getUsers()
            .subscribe(res => {
                this.users = res;});
    }

    postClick(postId){
        // currentPost starts as false, then becomes
        // int when assigned. Needs -1 for json
        // indexing to display correct post/title
        this.currentPost = postId;
        console.log("postid = ", postId);
        this.commentLoading = true;
        this._postsService.getComments(postId)
            .subscribe(res => {
                this.comments = res;});
        this.commentLoading = false;
    }

    dropdown(userId){
        console.log("userId = ", userId);
        if(userId == "") {
            this.isDropped = false;
            console.log("dropped? ", this.isDropped);
            this.postLoading = true;
            this._postsService.getPosts(userId)
                .subscribe(res => this.posts = res);
            this.postLoading = false;}
        else {
            this.isDropped = true;
            console.log("dropped? ", this.isDropped);
            this.postLoading = true;
            this._postsService.getPosts(userId)
                .subscribe(res => this.posts = res);
            this.postLoading = false;}
    }

}
