import { Component, OnInit } from '@angular/core';
import { IClient } from '../../interfaces/client';
import { CRMDataService } from '../../services/crm.data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, map, take } from '../../../../node_modules/rxjs/operators';
import { IType } from '../../interfaces/type';
import { IBranch } from '../../interfaces/branch';
import { IEmployee } from '../../interfaces/employee';

@Component({
    selector: 'app-crm-detail',
    templateUrl: './crm-detail.component.html',
    styleUrls: [ './crm-detail.component.scss' ]
})

export class CRMDetailComponent implements OnInit {

    public client: IClient;
    public subscriptions: Subscription[] = [];
    public currentType: IType;
    public currentStatus: IType;
    public sourceType: IType;
    public currentBranch: IBranch;
    public currentEmployee: IEmployee;
    

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
            this._getTypeInfo(this.client.industry_type_id);
            this._getBranchInfo(this.client.branch_id);
            this._getEmployeeInfo(this.client.rep_id);
            console.log(this.client);
        } );
        
    }

    private _getTypeInfo(id) {
        console.log('calling type ', id);
        this._crm.getTypeById(id).pipe( take(1) ).subscribe(response => this.currentType = response.result[0]);
    }

    private _getBranchInfo(id: number) {
        this._crm.getBranchById(id).pipe( take(1) ).subscribe(response => this.currentBranch = response.result[0]);
    }

    private _getEmployeeInfo(id: number) {
        this._crm.getEmployeeById(id).pipe( take(1) ).subscribe(response => this.currentEmployee = response.result[0]);
    }
}