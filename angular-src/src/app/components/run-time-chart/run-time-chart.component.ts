import { Component, OnInit } from '@angular/core';
import { IMovie } from '../../interfaces/movie';
import { SearchService } from '../../services/search.service';
import { take } from 'rxjs/operators';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-run-time-chart',
  templateUrl: './run-time-chart.component.html',
  styleUrls: ['./run-time-chart.component.scss']
})
export class RunTimeChartComponent implements OnInit {
  public view: any[] = [700, 400];
  public showXAxis = true;
  public showYAxis = true;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Years';
  public showYAxisLabel = true;
  public yAxisLabel = 'Run Time';
  public data;
  public startYear:number;

   // SLIDER OPTIONS
   public yearValue = [1990, 1995]
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

  constructor(public _search:SearchService, public snackBar: MatSnackBar ) {}


  ngOnInit() {
    // this.count(1960, 2018)
  }

  public count(startYear, endYear) {
    this.data = [];
    const search = {
        startYear,
        endYear
    }
    this._search.getRunTimeOfYear(search).pipe(take(1)).subscribe(async (data) => {
        const results = await data['result'];
        results.forEach(movie => {
          if(movie['date_part'] &&  movie['count'] && movie['runtime']){
            const obj = {
                "name": `${movie['date_part']}`,
                "series": [
                  {
                    "name":`${movie['date_part']}`,
                    "x":movie['date_part'],
                    "y": movie['runtime'] ,
                    "r": movie['count']
                  }
                ]
              };
              this.data.push(obj);
            };
          })      
    });
  }

  public submitYears() {
    console.log(this.yearValue[0] , this.yearValue[1])
    if (this.yearValue[0] > this.yearValue[1]) {
        this.snackBarMessage('Ending year needs to come after the starting year')
    } else {
      this.startYear = this.yearValue[0]
      this.count(this.yearValue[0],this.yearValue[1])
    }    
  }

  private snackBarMessage(message: string) {
    this.snackBar.open(message, null, {
        duration: 1000
    });
  }
}
