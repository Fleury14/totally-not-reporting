import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CatergorySelection } from '../../interfaces/category-selection';
import { IDynamicRequest } from '../../interfaces/dynamic-request';

@Component({
    selector: 'app-adv-search',
    templateUrl: './adv-search.component.html',
    styleUrls: [ './adv-search.component.scss' ]
})

export class AdvSearchComponent {
    @ViewChild('searchForm') private _searchForm: NgForm;
    public searchCategory: CatergorySelection[] = [{
        name: "Budget",
        ref: "budget",
        type: "number"
    }, {
        name: "Original Title",
        ref: "original_title",
        type: "text"
    }, {
        name: "Overview",
        ref: "overview",
        type: "text"
    }, {
        name: "Popularity",
        ref: "original_title",
        type: "number"
    }, {
        name: "Release Year",
        ref: "release_date",
        type: "number"
    }, {
        name: "Revenue",
        ref: "revenue",
        type: "number"
    }, {
        name: "Run Time",
        ref: "run_time",
        type: "number"
    }, {
        name: "Tag Line",
        ref: "tag_line",
        type: "text"
    }, {
        name: "Title",
        ref: "title",
        type: "text"
    }, {
        name: "Vote Average",
        ref: "vote_average",
        type: "number"
    }, {
        name: "Vote Count",
        ref: "vote_count",
        type: "number"
    }];

    public selectedCategory: string;
    public categoryValueNum: number;
    public requestedColumns: IDynamicRequest = {
        adult: false,
        budget: false,
        movie_id: false,
        original_title: false,
        overview: false,
        popularity: false,
        release_date: false,
        revenue: false,
        runtime: false,
        tagline: false,
        title: false,
        vote_average: false,
        vote_count: false
    }

    public submit(value) {
        console.log('submitting...', value, this.requestedColumns);
    }

}