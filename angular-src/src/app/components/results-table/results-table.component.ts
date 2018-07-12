import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, PageEvent, MatTableDataSource } from '@angular/material';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';
import { IMovie } from '../../interfaces/movie';
import { Router } from '@angular/router';

@Component({
    selector: 'app-results-table',
    templateUrl: './results-table.component.html',
    styleUrls: [ './results-table.component.scss']
})

export class ResultsTableComponent implements OnInit {

    public storedResults: any;
    private _rawResults: any;
    public resultSub: Subscription;
    public columnsToDisplay: String[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    pageEvent: PageEvent;
    public pageSize = 10;
    public pageSizeOptions = [5, 10, 20];

    constructor(private _search: SearchService, private _router: Router) {}

    ngOnInit(): void {
        this._search.resultsSubscription().subscribe(results => {
            this._rawResults = results.result;
            // console.log(this.storedResults);

            this.columnsToDisplay = [];
            for (const key in this._rawResults[0]) {
                if (this._rawResults[0][key]) {
                    this.columnsToDisplay.push(key);
                }
            }
            // console.log('final columns to display', this.columnsToDisplay);
            this.columnsToDisplay.sort(function(a, b) {

                const subjectOrder: String[] = ['title', 'tagline', 'release_date', 'original_title', 'budget',
                'revenue', 'runtime', 'overview', 'popularity', 'adult', 'vote_average', 'vote_count', 'movie_id', 'poster_id', 'poster_title', 'poster_path'];

                return subjectOrder.indexOf(a) - subjectOrder.indexOf(b);
            });
            this.storedResults = new MatTableDataSource<IMovie>(this._rawResults);
            // console.log('sort', this.sort);
            this.storedResults.sort = this.sort;
            this.storedResults.paginator = this.paginator;
            // console.log(this.storedResults);
            // console.log(this.storedResults.data.overview);
        });

        this._search.refreshResults();
        // TODO unsubscribe to result
        // this._search.resultsSubscription().unsubscribe();
    }

    public cardView() {
        this._router.navigate(['results']);
    }
}
