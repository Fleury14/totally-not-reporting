import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource, PageEvent, MatSort } from '@angular/material';
import { IMovie } from '../../interfaces/movie';

@Component({
    selector: 'app-result',
    templateUrl: './results.component.html',
    styleUrls: [ './results.component.scss' ]
})

export class ResultComponent implements OnInit {

    public storedResults:any;
    public resultSub: Subscription;
    public columnsToDisplay:String[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    pageEvent: PageEvent;
    public pageSize = 10;
    public pageSizeOptions = [5, 10, 20];

    

    constructor(private _search: SearchService) {}

    ngOnInit(): void {
        // this._search.getResults().subscribe(results => this.storedResults = results)
        this._search.resultsSubscription().subscribe(results => {
            this.storedResults = results.data.result;
            // console.log(this.storedResults);

            this.columnsToDisplay = [];
            for (let key in this.storedResults[0]) {
                if(this.storedResults[0][key]) {
                    this.columnsToDisplay.push(key);
                    // console.log('pushing...', key);
                }
            }
            // console.log('final columns to display', this.columnsToDisplay);
            this.columnsToDisplay.sort(function(a, b) {
                const subjectOrder:String[] = ['title', 'tagline', 'release_date', 'original_title', 'budget', 'revenue', 'runtime', 'overview', 'popularity', 'adult', 'vote_average', 'vote_count'];
                return subjectOrder.indexOf(a) - subjectOrder.indexOf(b);
            })
            this.storedResults = new MatTableDataSource<IMovie>(this.storedResults);
            // console.log('sort', this.sort);
            this.storedResults.sort = this.sort;
            this.storedResults.paginator = this.paginator;
            // console.log(this.storedResults);
            console.log(this.storedResults.data.overview);
        });

        this._search.refreshResults();
    }

    public stringCutoff(string:string) {
        const maxLength = 200;

        if(string.length <= maxLength){
            const result = string.substr(0,maxLength);
            return result;
        } else {
            const result = string.substr(0,maxLength) + "...";
            return result;
        }
    }
    
}