import { Component } from '@angular/core';
import { SearchService } from './../../services/search.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: [ './sidebar.component.scss' ]
})

export class SideBarComponent {
    constructor(
        private _search: SearchService,
        private _router: Router,

    ) {}
    public topTen(category: string) {
        this._search.topTenSearch(category).pipe( take(1)).subscribe( (data) => {
            console.log(data);
            this._search.storeResults(data);
            this._router.navigate(['results'])
        });
    }

    public byYearSearch() {
        const byYear = document.querySelector<HTMLInputElement>('#byYear').value;
        console.log(byYear, typeof byYear);
        this._search.getByYearSearch( parseInt(byYear) ).pipe( take(1)).subscribe( (data) => {
            console.log(data);
            this._search.storeResults(data);
            this._router.navigate(['results']);
        });
    }
}