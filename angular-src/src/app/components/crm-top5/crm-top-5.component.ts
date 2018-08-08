import { Component, OnInit } from '@angular/core';
import { CRMDataService } from '../../services/crm.data.service';

@Component({
    selector: 'app-crm-top5',
    templateUrl: './crm-top-5.component.html',
    styleUrls: [ './crm-top-5.component.scss' ]
})

export class CRMTop5Component implements OnInit {
    
    private clientList = [];
    public top5Shares;
    public top5Credit;

    constructor(private _crm: CRMDataService) {}

    ngOnInit(): void {
        this._crm.getClientsAndAccounts().subscribe(list => {
            this.clientList = list.result;
            this._initTop5(this.clientList)
        });
    }

    private _initTop5(list: any[]) {
        list = this._sortList(list, 'total_shares');
        this.top5Shares = list.slice(0, 5);
        list = this._sortList(list, 'line_of_credit');
        this.top5Credit = list.slice(0, 5);
        console.log('top5s', this.top5Credit, this.top5Shares);
    }

    private _sortList(list: any[], category: string) {
        // console.log(list);
        list.sort( (a, b) => {return b[category] - a[category]});
        return list
    }

}