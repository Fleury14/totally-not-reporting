import { Component, OnInit } from '@angular/core';
import { IClient } from '../../interfaces/client';
import { CRMDataService } from '../../services/crm.data.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
    selector: 'app-crm-detail',
    templateUrl: './crm-detail.component.html',
    styleUrls: [ './crm-detail.component.scss' ]
})

export class CRMDetailComponent implements OnInit {

    public client: IClient;

    constructor(private _crm: CRMDataService, private _actRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this._actRoute.paramMap.subscribe(route => {
            const id = parseInt(route.get('id'));
            if(id) {
                this._crm.getClientById(id).subscribe( response => this.client = response.result[0] );
            } else {
                this.client = this._crm.currentClient;
                console.log(this.client);
            }
        })
    }

}