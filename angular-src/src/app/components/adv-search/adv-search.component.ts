import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { CategorySelection } from '../../interfaces/category-selection';
import { IDynamicRequest } from '../../interfaces/dynamic-request';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-adv-search',
    templateUrl: './adv-search.component.html',
    styleUrls: [ './adv-search.component.scss' ]
})

export class AdvSearchComponent implements OnInit {
    @ViewChild('searchForm') private _searchForm: NgForm;

    public searchCategory: CategorySelection[] = [{
        name: 'Budget',
        ref: 'budget',
        type: 'number'
    }, {
        name: 'Original Title',
        ref: 'original_title',
        type: 'text'
    }, {
        name: 'Overview',
        ref: 'overview',
        type: 'text'
    }, {
        name: 'Popularity',
        ref: 'popularity',
        type: 'number'
    }, {
        name: 'Release Year',
        ref: 'release_date',
        type: 'number'
    }, {
        name: 'Revenue',
        ref: 'revenue',
        type: 'number'
    }, {
        name: 'Run Time',
        ref: 'runtime',
        type: 'number'
    }, {
        name: 'Tag Line',
        ref: 'tagline',
        type: 'text'
    }, {
        name: 'Title',
        ref: 'title',
        type: 'text'
    }, {
        name: 'Vote Average',
        ref: 'vote_average',
        type: 'number'
    }, {
        name: 'Vote Count',
        ref: 'vote_count',
        type: 'number'
    }];

    fullFormGroup: FormGroup;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    droppedItems = [];

    public selectedCategory: CategorySelection;
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
    };

    constructor(private _formBuilder: FormBuilder, private _advSearch: SearchService, private _router: Router) {}

    ngOnInit(): void {}

    public submit(value) {
        this.droppedItems.forEach(item => {
          this.requestedColumns[item.ref] = true;
        });
        if (value.category !== undefined && value.search !== undefined && value.order !== undefined && value.column !== undefined) {
          console.log(value.returnType, value.category, value.search, value.order, value.column, this.requestedColumns);
          this._advSearch.customSearch(value.category, value.search, value.order ).subscribe(res => {
            this._router.navigate(['results']);
          });
          } else {
            console.log('Please enter all fields...');
        }
      }

    onItemDrop(e: any) {
      this.droppedItems.push(e.dragData);
      this.removeItem(e.dragData, this.searchCategory);
    }

    reset(value) {
      this.removeItem(value, this.droppedItems);
    }

    removeItem(item: any, list: Array<any>) {
      const index = list.map(function (e) {
        return e.name;
      }).indexOf(item.name);
      list.splice(index, 1);
    }
}
