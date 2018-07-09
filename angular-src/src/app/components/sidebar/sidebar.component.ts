import { Component, DoCheck, OnInit } from '@angular/core';
import { SearchService } from './../../services/search.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { RecentSearchService } from '../../services/recent-search.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: [ './sidebar.component.scss' ]
})

export class SideBarComponent implements DoCheck {
    private recentArray:any;
    constructor(
        private _search: SearchService,
        private _router: Router,
        private _recent: RecentSearchService
    ) {}

    ngDoCheck(){
        this.recentArray = this._recent.getSearchList();
    }

    public topTen(category: string) {
        this._search.topTenSearch(category).pipe( take(1)).subscribe( (data) => {
            this._recent.addSearchList(category, data.endpoint);
            this._search.storeResults(data);
            this._router.navigate(['results'])
        });
    }

    public byYearSearch(year?) {
        const byYear = year ? year : document.querySelector<HTMLInputElement>('#byYear').value;
        this._search.getByYearSearch( parseInt(byYear) ).pipe( take(1)).subscribe( (data) => {
            this._recent.addSearchList(byYear, data.endpoint);
            this._search.storeResults(data);
            this._router.navigate(['results']);
        });
    }

    public searchMovie(search, endpoint) {
        if (endpoint == 'search title') {
            this._search.basicSearch(search).pipe( take(1) ).subscribe( data => {
                this._recent.addSearchList(data.search, data.endpoint);
                this._search.storeResults(data);
                this._router.navigate(['results']);
            } );
        } else if (endpoint == 'by year') {
            this.byYearSearch(search);
        } else {
            this.topTen(search); 
        }
    }
}