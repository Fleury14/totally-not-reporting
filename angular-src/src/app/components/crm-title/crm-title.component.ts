import { Component, OnInit } from '@angular/core';
import { CRMDataService } from '../../services/crm.data.service';
import { IClient } from '../../interfaces/client';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-crm-title',
    templateUrl: './crm-title.component.html',
    styleUrls: [ './crm-title.component.scss' ]
})

export class CRMTitleComponent implements OnInit {

    public clientList:IClient[] = []
    constructor(private _crm: CRMDataService) {}

    ngOnInit(): void {
        this._crm.getClients().pipe( take(1) ).subscribe(response => {
            if(response && response.result) {
                console.log('response:', response);
                this.clientList = response.result;
            };
        });
    }

}