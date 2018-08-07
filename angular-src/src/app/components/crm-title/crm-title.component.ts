import { Component, OnInit } from '@angular/core';
import { CRMDataService } from '../../services/crm.data.service';
import { IClient } from '../../interfaces/client';
import { take } from 'rxjs/operators';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
    selector: 'app-crm-title',
    templateUrl: './crm-title.component.html',
    styleUrls: [ './crm-title.component.scss' ]
})

export class CRMTitleComponent implements OnInit {

    public clientList:IClient[] = []
    constructor(private _crm: CRMDataService, private _router: Router) {}

    ngOnInit(): void {
        this._crm.getClients().pipe( take(1) ).subscribe(response => {
            if(response && response.result) {
                console.log('response:', response);
                this.clientList = response.result;
            };
        });
    }

    public selectClient(client: IClient) {
        this._crm.currentClient = client;
        this._router.navigate(['crm/detail/', client.id]);
    }

}