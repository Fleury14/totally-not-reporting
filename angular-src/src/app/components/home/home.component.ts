import { Component, OnInit } from '@angular/core';
import { RecentSearchService } from '../../services/recent-search.service';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit {
    recentList: any;
    display = 'block'; 
    constructor(private _recent: RecentSearchService,  private _search: SearchService, private _router: Router){}

    ngOnInit(){
        this.recentList = this._recent.getSearchList(); 
        if(this.recentList){
            this.display = 'none';
        }
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