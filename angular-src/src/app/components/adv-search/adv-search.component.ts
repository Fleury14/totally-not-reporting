import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-adv-search',
    templateUrl: './adv-search.component.html',
    styleUrls: [ './adv-search.component.scss' ]
})

export class AdvSearchComponent {
    @ViewChild('searchForm') private _searchForm: NgForm;

    public whatAmI() {
        console.log(this._searchForm);
    }
}