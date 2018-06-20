import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: [ './nav.component.scss' ]
})

export class NavComponent {

    public search:string;

    constructor (private _search: SearchService, private _router: Router) {}

    public searchMovie() {
        if(this.search) {
            this._search.basicSearch(this.search).pipe( take(1) ).subscribe( data => {
                console.log(data);
                this._search.storeResults(data);
                this._router.navigate(['results'])
            } );
        }
       
    }
}