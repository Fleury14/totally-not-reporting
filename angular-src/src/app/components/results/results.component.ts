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
    private _rawResults:any;
    public resultSub: Subscription;
    public columnsToDisplay: String[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    pageEvent: PageEvent;
    public pageSize = 10;
    public pageSizeOptions = [5, 10, 20];

    constructor(private _search: SearchService, public dialog: MatDialog) {}

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

                const subjectOrder:String[] = ['title', 'tagline', 'release_date', 'original_title', 'budget', 'revenue', 'runtime', 'overview', 'popularity', 'adult', 'vote_average', 'vote_count', 'movie_id'];

                return subjectOrder.indexOf(a) - subjectOrder.indexOf(b);
            });
            this.storedResults = new MatTableDataSource<IMovie>(this._rawResults);
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
        if(!string) { return string; }
        else {
          if(string.length <= maxLength){
            const result = string.substr(0,maxLength);
            return result;
        } else {
            const result = string.substr(0,maxLength) + "...";
            return result;
        }
        }
        
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
