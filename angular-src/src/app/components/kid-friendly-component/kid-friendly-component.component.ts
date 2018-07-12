import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { take } from 'rxjs/operators';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { IMovie } from '../../interfaces/movie';

@Component({
  selector: 'app-kid-friendly-component',
  templateUrl: './kid-friendly-component.component.html',
  styleUrls: ['./kid-friendly-component.component.scss']
})
export class KidFriendlyComponent implements OnInit {
  @ViewChild('yearForm') private _yearForm: NgForm;
  public startYear: number;
  public endYear: number;
  public searchResults: IMovie[];
  public showResults = false;
  public releases: any[];

  // slider options
  public yearValue = [1990, 1995];
  public sliderConfig: any = {
      behaviour: 'drag',
      connect: true,
      margin: 1,
      limit: 5, // NOTE: overwritten by [limit]="10"
      step: 1,
      range: {
        min: 1960,
        max: 2017
      },
      pips: {
          mode: 'count',
          density: 2,
          values: 7,
          stepped: true
      }
    };

    // pie chart options
    public showLegend = true;
    // public view: any[] = [700, 400];
    public colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
      };
    public showLabels = true;
    public explodeSlices = false;
    public doughnut = true;
    public pieData:any;

    constructor(private _search: SearchService,public snackBar: MatSnackBar ) {}

  ngOnInit(): void {
  }

  public submitYears() {
    if (this.yearValue[0] > this.yearValue[1]) {
        this.snackBarMessage('Ending year needs to come after the starting year');
    } else {
        this._search.getYearRange(this.yearValue[0], this.yearValue[1]).pipe(take(1)).subscribe(response => {
            this.searchResults = response.result;
            this.setPieChart(this.searchResults);
        });
    }
  }

      private snackBarMessage(message: string) {
        this.snackBar.open(message, null, {
            duration: 1000
        });
      }

    public setPieChart(movie) {
        this.pieData = [{
            name: 'Yes',
            value: 0
        }, {
            name: 'No',
            value: 0
        }];

        movie.forEach( (movie) => {
            if (movie.adult === false) {
                this.pieData[0]['value']++;
            } else {
                this.pieData[1]['value']++;
            }
        });
    }

}
