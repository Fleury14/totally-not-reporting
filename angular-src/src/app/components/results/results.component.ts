import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { IMovie } from '../../interfaces/movie';
import { MatDialog } from '@angular/material';
import { ModalComponent } from './modal.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-result',
    templateUrl: './results.component.html',
    styleUrls: [ './results.component.scss' ]
})

export class ResultComponent implements OnInit {

    public storedResults: any;
    private _rawResults: any;
    public resultSub: Subscription;

    // piechart options
    public showLegend = true;
    public view: any[] = [700, 400];
    public colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
      };
    public showLabels = true;
    public explodeSlices = false;
    public doughnut = true;
    public pieData: any;

    constructor(private _search: SearchService, public dialog: MatDialog, private _router: Router) {}

    ngOnInit(): void {
        this._search.resultsSubscription().subscribe(results => {
            this._rawResults = results.result;
            this.storedResults = new MatTableDataSource<IMovie>(this._rawResults);
            this.setPieChart();
        });


        this._search.refreshResults();
    }

    public stringCutoff(string: string, maxLength) {
        if (!string) { return string; } else {
          if (string.length <= maxLength) {
            const result = string.substr(0, maxLength);
            return result;
        } else {
            const result = string.substr(0, maxLength) + '...';
            return result;
        }
        }
    }

    showMovieModal(movie: any): void {
        const openModal = this.dialog.open( ModalComponent, {
          width: '700px',
          height: '650px',
          data: movie
        });
      }

      tableView() {
        this._router.navigate(['results-table']);
      }

    public setPieChart() {
        this.pieData = [{
            name: 'Under 50 million',
            value: 0        }, {
            name: 'Between 50 and 150 million',
            value: 0
        }, {
            name: 'Over 150 million',
            value: 0
        }];
        this._rawResults.forEach( (movie: IMovie) => {
            if (movie.revenue > 150000000) {
                this.pieData[2].value++;
            } else if (movie.revenue > 50000000 ) {
                this.pieData[1].value++;
            } else if (movie.revenue > 0) {
                this.pieData[0].value++;
            }
        });
        console.log('pie data', this.pieData);
        Object.assign(this, this.pieData);
    }

    onSelect(event) {
        console.log(event);
    }
}

export class Rating {
  public ratings;
  public isHover = false;
  constructor() {
    this.ratings = Array(5).fill(4).map((x, i) => i); // [0,1,2,3,4]
    this.ratings = Array(5).fill(4); // [4,4,4,4,4]
  }
  rate = (r) => (this.ratings = r);
}
