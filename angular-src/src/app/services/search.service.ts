import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { of, Subject, Observable } from 'rxjs';


@Injectable()

export class SearchService {

    public searchSubj:Subject<any> = new Subject<any>();
    private storedSearchData: any;

    constructor(private _http:HttpService) {}

    public basicSearch(search:string) {
        const payload = {
            search: search
        }
        return this._http.post('search-title', payload);
    }

    public storeResults(data:any) {
        this.storedSearchData = data;
        this.searchSubj.next({data})
    }

    public refreshResults() {
        if(this.storedSearchData) {
            this.searchSubj.next(this.storedSearchData);
        }
        
    }

    public resultsSubscription():Observable<any> {
        return this.searchSubj.asObservable();
    }

}