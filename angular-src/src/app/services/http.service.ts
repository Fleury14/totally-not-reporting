import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class HttpService {

    private _apiURL: string;

    constructor(private _http: HttpClient) {

        // AWS
        this._apiURL = 'http://tnr-3.ttm76kf9pn.us-west-2.elasticbeanstalk.com:8080/api/';

        // if (window.navigator.platform.toLowerCase().includes('win')) {
        //     this._apiURL = 'http://192.168.99.100:8080/api/';
        // } else {
        //     this._apiURL = 'http://localhost:8080/api/';
        // }
    }

    public post(url: string, payload: any) {
        const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        return this._http.post(this._apiURL + url, payload, {headers});
    }

    public delete(url: string, payload: any) {
        const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        return this._http.delete(this._apiURL + url, {headers});
    }

    public get(url: string) {
        const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        return this._http.get(this._apiURL + url, {headers});
    }

}
