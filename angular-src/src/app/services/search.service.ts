import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Subject, Observable } from 'rxjs';
import { IDynamicRequest } from '../interfaces/dynamic-request';
import { map } from 'rxjs/operators';
import { IMovie } from '../interfaces/movie';


@Injectable()

export class SearchService {

    public searchSubj:Subject<any> = new Subject<any>();
    private storedSearchData: any;

    constructor(private _http:HttpService) {}

    public basicSearch(search:string, returnType?:IDynamicRequest) {
        const payload = {
            search: search
        }
        return this._http.post('search-title', payload).pipe(
            map( (response) => {
                return this._mapResults(response, returnType);      
            })
        );
    }

    private _mapResults(response:any, returnType:IDynamicRequest) {
        if (returnType) {
            const movies:IMovie[] = response['result'];
            const dataToBeSent = []
            movies.forEach( (movie:IMovie) => {
                const newMovie = {};
                for (let key in returnType) {
                    if(returnType[key]) {
                        newMovie[key] = movie[key];
                    }
                }
                dataToBeSent.push(newMovie);
            } )
            response['result'] = dataToBeSent;
            return response;
        } else {
            return response;
        }
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