import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IClient } from '../interfaces/client';
import { Observable } from 'rxjs';

@Injectable()

export class CRMDataService {

    constructor( private _http: HttpService ) {}

    public getClients(): Observable<any> {
        return this._http.get('crm/get-all-clients');
    }
}