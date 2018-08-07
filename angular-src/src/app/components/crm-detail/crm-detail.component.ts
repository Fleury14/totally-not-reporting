import { Component, OnInit } from '@angular/core';
import { IClient } from '../../interfaces/client';
import { CRMDataService } from '../../services/crm.data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, map } from '../../../../node_modules/rxjs/operators';
import { IType } from '../../interfaces/type';

@Component({
    selector: 'app-crm-detail',
    templateUrl: './crm-detail.component.html',
    styleUrls: [ './crm-detail.component.scss' ]
})

export class CRMDetailComponent implements OnInit {

    public client: IClient;
    public subscriptions: Subscription[] = [];
    public currentType: IType;

    constructor(private _crm: CRMDataService, private _actRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this._actRoute.paramMap.pipe(
            map( paramResponse => paramResponse.get('id') ),
            switchMap( (id:string) => {
                let idNum = parseInt(id);
                if(id) {
                    return this._crm.getClientById(idNum);
                } else {
                    this.client = this._crm.currentClient;
                }
            } ),
        ).subscribe( response => {
            this.client = response.result[0];
            this.getTypeInfo();
        } );
        
    }

    private _getTypeInfo() {
        
    }

}