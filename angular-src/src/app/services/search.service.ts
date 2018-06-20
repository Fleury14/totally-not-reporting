import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()

export class SearchService {

    constructor(private _http:HttpService) {}

    public basicSearch(search:string) {
        const payload = {
            search: search
        }
        return this._http.post('search-title', payload);
    }

    
}