import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-result',
    templateUrl: './results.component.html',
    styleUrls: [ './results.component.scss' ]
})

export class ResultComponent implements OnInit {

    public storedResults:any;
    public resultSub: Subscription;

    constructor(private _search: SearchService) {}

    ngOnInit(): void {
        // this._search.getResults().subscribe(results => this.storedResults = results)
        this._search.resultsSubscription().subscribe(results => this.storedResults = results.data);
    }
    
}