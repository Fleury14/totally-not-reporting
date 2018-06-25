import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource, PageEvent, MatSort } from '@angular/material';
import { IMovie } from '../../interfaces/movie';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'app-result',
    templateUrl: './results.component.html',
    styleUrls: [ './results.component.scss' ]
})

export class ResultComponent implements OnInit {

    public storedResults: any;
    public resultSub: Subscription;
    public columnsToDisplay: String[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    pageEvent: PageEvent;
    public pageSize = 10;
    public pageSizeOptions = [5, 10, 20];

    constructor(private _search: SearchService, public dialog: MatDialog) {}

    ngOnInit(): void {
        // this._search.getResults().subscribe(results => this.storedResults = results)
        this._search.resultsSubscription().subscribe(results => {
            console.log('receiving data', results);
            this.storedResults = results;
            console.log('stored results:', this.storedResults);
            this.storedResults = results.data.result;
            // console.log(this.storedResults);

            this.columnsToDisplay = [];
            for (const key in this.storedResults[0]) {
                if (this.storedResults[0][key]) {
                    this.columnsToDisplay.push(key);
                    console.log('pushing...', key);
                }
            }
            // console.log('final columns to display', this.columnsToDisplay);
            this.columnsToDisplay.sort(function(a, b) {
                const subjectOrder: String[] = ['title', 'tagline', 'release_date', 'original_title',
                'budget', 'revenue', 'runtime', 'overview', 'popularity', 'adult', 'vote_average', 'vote_count'];
                return subjectOrder.indexOf(a) - subjectOrder.indexOf(b);
            });
            this.storedResults = new MatTableDataSource<IMovie>(this.storedResults);
            // console.log('sort', this.sort);
            this.storedResults.sort = this.sort;
            this.storedResults.paginator = this.paginator;
            // console.log(this.storedResults);
        });

        this._search.refreshResults();
    }
    showMovieModal(movie: any): void {
      console.log(movie);
      const openModal = this.dialog.open(ModalComponent, {
        width: '950px',
        height: '950px',
        data: movie
      });
    }

  }

  @Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: [ './results.component.scss' ]

  })

  export class ModalComponent implements OnInit {

    constructor(
      public openModal: MatDialogRef<ModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
      console.log(this.data);
    }

    onNoClick(): void {
      this.openModal.close();
    }
  }
