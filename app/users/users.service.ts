import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
    private _url = "http://jsonplaceholder.typicode.com/users";
    delUserId = {};

    constructor(private _http: Http){
    }

    getUsers() {
        return this._http.get(this._url)
            .map(res => res.json());
    }

    getUser(userid) {
        return this._http.get(this._url)
            .map(res => res.json()[userid]);
    }

    postUsers(users) {
        return this._http.post(this._url, JSON.stringify(users))
            .map(res => res.json());
    }

    deleteUser(userid) {
        this.delUserId = { id: userid };
        console.log("delUserId = ", this.delUserId);
        return this._http.delete(this._url, JSON.stringify(this.delUserId))
            .map(res => res.json());
    }

}
