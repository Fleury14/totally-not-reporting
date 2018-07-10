import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CategorySelection } from '../../interfaces/category-selection';
import { IDynamicRequest } from '../../interfaces/dynamic-request';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
// import { ModalComponent } from '../results/modal.component';
import { Router } from '@angular/router';
import { IMovie } from '../../interfaces/movie';

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

    private _advSearchResults: any;
    public advStoredResults: any;
    public advResultsSub: Subscription;
    public adSearch: string;

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

    constructor(private _formBuilder: FormBuilder, private _advSearch: SearchService, public dialog: MatDialog, private _router: Router) {}

    ngOnInit(): void {
      this._advSearch.resultsSubscription().subscribe(advResults => {
        this._advSearchResults = advResults.result;
        this.advStoredResults = new MatTableDataSource<IMovie>(this._advSearchResults);
        console.log(this.advStoredResults);
      });

      this._advSearch.refreshResults();

      this.fullFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
    }

    public submit(value) {
        this.droppedItems.forEach(item => {
          this.requestedColumns[item.ref] = true;
        });
        console.log('submitting...', value, this.requestedColumns);
        if (value.returnType === 'table') {
            this.tableSearch(value);
        } else if (value.returnType === 'cards') {
            this.cardSearch(value);
        }
      }

    onItemDrop(e: any) {
      this.droppedItems.push(e.dragData);
      console.log(this.droppedItems);
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

    tableView() {
      this._router.navigate(['results-table']);
    }

    public tableSearch(value) {
      return value;
    }
    public cardSearch(value) {
      return value;
    }
    public searchMovies() {
      if (this.adSearch) {
        console.log('slayer');
        this._advSearch.customSearch(this.adSearch).pipe().subscribe( data => {
          this._advSearch.storeResults(data);
          this._router.navigate(['results']);

          console.log('woriks');
        } );
    }

}
}
