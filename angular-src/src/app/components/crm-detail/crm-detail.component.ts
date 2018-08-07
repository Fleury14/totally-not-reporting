import { Component, OnInit } from '@angular/core';
import { IClient } from '../../interfaces/client';
import { CRMDataService } from '../../services/crm.data.service';

@Component({
    selector: 'app-crm-detail',
    templateUrl: './crm-detail.component.html',
    styleUrls: [ './crm-detail.component.scss' ]
})

export class CRMDetailComponent implements OnInit {

    public client: IClient;

    constructor(private _crm: CRMDataService) {}

    ngOnInit(): void {
        this.client = this._crm.currentClient;
        console.log(this.client);
    }

}