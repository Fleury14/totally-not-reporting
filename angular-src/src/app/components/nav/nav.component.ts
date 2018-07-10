import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IDynamicRequest } from '../../interfaces/dynamic-request';
import { RecentSearchService } from '../../services/recent-search.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: [ './nav.component.scss' ]
})

export class NavComponent {
    public search: string;

    constructor (private _search: SearchService, private _router: Router, private _recent: RecentSearchService) {}

    public searchMovie() {
        // Example of request object. Incluse this in the search method function if you wish to try it out
        // const returntype:IDynamicRequest = {
        //     adult: false,
        //     budget: true,
        //     original_title: false,
        //     overview: false,
        //     popularity: false,
        //     release_date: false,
        //     revenue: false,
        //     runtime: false,
        //     tagline: false,
        //     title: true,
        //     vote_average: false,
        //     vote_count: false
        // }
        if (this.search) {
            this._search.basicSearch(this.search).pipe( take(1) ).subscribe( data => {
                this._recent.addSearchList(data.search, data.endpoint);
                this._search.storeResults(data);
                this._router.navigate(['results']);
            } );
        }

    }
}
