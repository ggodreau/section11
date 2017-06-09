import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {
    private _url = "http://jsonplaceholder.typicode.com/posts";

    constructor(private _http: Http){
    }

    // question mark not needed, but included anyway for nulls
    getPosts(userId?) {
        if(userId == null) {
            console.log("loop1, userid = ", userId);
            return this._http.get(this._url)
                .map(res => res.json());}
        else {
            console.log("loop2, userid = ", userId);
            return this._http.get(
                    this._url + "?userId=" + userId)
                .map(res => res.json());}
    }
    getComments(id) {
        return this._http.get(this._url + "/" + id + "/comments")
            .map(res => res.json());
    }
}
