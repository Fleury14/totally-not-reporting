import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IClient } from '../interfaces/client';
import { Observable } from 'rxjs';

@Injectable()

export class CRMDataService {

    private selectedClient: IClient;

    constructor( private _http: HttpService ) {}

    public getClients(): Observable<any> {
        return this._http.get('crm/get-all-clients');
    }

    public set currentClient(client: IClient) {
        this.selectedClient = client;
    }

    public get currentClient(): IClient {
        return this.selectedClient
    }

    public getClientById(id: number): Observable<any> {
        if (!id) {
            console.log('No id provided...');
            return;
        } else {
            const payload = {
                search: id
            }
            return this._http.post('crm/get-client-by-id', payload);
        }
    }

    public getTypeById(id: number): Observable<any> {
        if (!id) {
            console.log('No id provided...');
            return;
        } else {
            const payload = {
                search: id
            }
            return this._http.post('crm/get-type-by-id', payload);
        }
    }

    public getBranchById(id: number): Observable<any> {
        if (!id) {
            console.log('No id provided...');
            return;
        } else {
            const payload = {
                search: id
            }
            return this._http.post('crm/get-branch-by-id', payload);
        }
    }

    public getEmployeeById(id: number): Observable<any> {
        if (!id) {
            console.log('No id provided...');
            return;
        } else {
            const payload = {
                search: id
            }
            return this._http.post('crm/get-employee-by-id', payload);
        }
    }
}