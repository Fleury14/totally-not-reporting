import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
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
        this.recentArray = this._recent.getSearchList()
        console.log('array',this.recentArray);
    }

    public topTen(category: string) {
        // this._recent.addSearchList(category, 'topTen');
        this._search.topTenSearch(category).pipe( take(1)).subscribe( (data) => {
            this._search.storeResults(data);
            this._router.navigate(['results'])
        });
    }

    public byYearSearch() {
        const byYear = document.querySelector<HTMLInputElement>('#byYear').value;
        // this._recent.addSearchList(byYear, 'byYearSearch');
        this._search.getByYearSearch( parseInt(byYear) ).pipe( take(1)).subscribe( (data) => {
            this._search.storeResults(data);
            this._router.navigate(['results']);
        });
    }

    public searchMovie(entry) {
        console.log('search',entry)
        // if (entry = "top10")
        if (entry) {
            console.log('try')
            // this._recent.addSearchList(this.search)
            this._search.basicSearch(entry).pipe( take(1) ).subscribe( data => {
                console.log(data);
                this._search.storeResults(data);
                this._router.navigate(['results']);
            } );
        }
    }
}