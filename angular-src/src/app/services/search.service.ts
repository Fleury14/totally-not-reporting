import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Subject, Observable } from 'rxjs';
import { IDynamicRequest } from '../interfaces/dynamic-request';
import { map } from 'rxjs/operators';
import { IMovie } from '../interfaces/movie';
@Injectable()

export class SearchService {

    public searchSubj: Subject<any> = new Subject<any>();
    private storedSearchData: any;

    constructor(private _http: HttpService) {}

    public basicSearch(search: string, returnType?: IDynamicRequest) {
        const payload = {
            search: search
        };
        return this._http.post('search-title', payload).pipe(
            map( (response) => {
                return this._mapResults(response, returnType);
            })
        );
    }

    private _mapResults(response: any, returnType: IDynamicRequest) {
        if (returnType) {
            const movies: IMovie[] = response['result'];
            const dataToBeSent = [];
            movies.forEach( (movie: IMovie) => {
                const newMovie = {};
                for (const key in returnType) {
                    if (returnType[key]) {
                        newMovie[key] = movie[key];
                    }
                }
                dataToBeSent.push(newMovie);
            } );
            response['result'] = dataToBeSent;
            return response;
        } else {
            return response;
        }
    }

    public storeResults(data: any) {
        this.storedSearchData = data;
        this.searchSubj.next(data);
    }

    public refreshResults() {
        if (this.storedSearchData) {
            this.searchSubj.next(this.storedSearchData);
        }
    }

    public resultsSubscription(): Observable<any> {
        return this.searchSubj.asObservable();
    }

    public topTenSearch(category: string, returnType?: IDynamicRequest) {
        const payload = {
            category: category
        };
        return this._http.post('top10', payload).pipe(
            map( (response) => {
                return this._mapResults(response, returnType);
            })
        );
    }

    public getYearRange(startYear: number, endYear: number, returnType?: IDynamicRequest) {
        const payload = {
            startYear: startYear,
            endYear: endYear
        };
        return this._http.post('get-year-range', payload).pipe(
            map( (response) => {
                return this._mapResults(response, returnType);
            })
        );
    }

    public getByYearSearch(search: any, returnType?: IDynamicRequest) {
        const payload = {
            search: search
        };
        return this._http.post('get-by-year', payload).pipe(
            map( (response) => {
                return this._mapResults(response, returnType);
            })
        );
    }


    public getCountOfYear(search: any) {
        return this._http.post('count-by-year', search).pipe(
            map( (response) => {
                return response;
            })
        );
    }

    public getRunTimeOfYear(search: any) {
        return this._http.post('run-time-by-year', search).pipe(
            map( (response) => {
                return response;
            })
        );
    }


    public customSearch(category: string, search: string, order: string, returnType?: IDynamicRequest) {
      const Payload = {
        search: search,
        category: category,
        order: order,
      };
      return this._http.post('custom-search', Payload).pipe(
        map( (response) => {
            return this._mapResults(response, returnType);
        })
    );
  }
  public tableJoin(selectMoviesMeta: boolean, selectMoviesVote: boolean, selectMoviesCredits: boolean) {
    const tables = {
      selectMoviesMeta: selectMoviesMeta,
      selectMoviesVote: selectMoviesVote,
      selectMoviesCredits: selectMoviesCredits,
    };
    return this._http.post('table-join', tables).pipe(
      map((resp) => {
        return resp;
      })
    );
  }
}

