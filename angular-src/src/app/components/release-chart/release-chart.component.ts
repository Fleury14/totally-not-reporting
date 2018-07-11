import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SearchService } from '../../services/search.service';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-release-chart',
  templateUrl: './release-chart.component.html',
  styleUrls: ['./release-chart.component.scss']
})
export class ReleaseChartComponent implements OnInit {
  public showXAxis = true;
  public showYAxis = true;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Years';
  public showYAxisLabel = true;
  public yAxisLabel = 'Number of Movies';
  public releases: any[];
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  public view: any[] = [700, 400];
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

  constructor(private _search: SearchService,public snackBar: MatSnackBar ) {}

  ngOnInit() {
    this.count(1900,2020);
  }

  public count(startYear, endYear) {
    this.releases = [];
    const search = {
        startYear,
        endYear
    }
    this._search.getCountOfYear(search).pipe(take(1)).subscribe(async (data) => {
        const results = await data['result'];
        results.forEach(release => {
          if(release.date_part){
            let obj = {
              name: release.date_part.toString(),
              value: parseInt(release.count)
            };
            this.releases.push(obj);
          }
        });
        
    });
  }
  public submitYears() {
    if (this.yearValue[0] > this.yearValue[1]) {
        this.snackBarMessage('Ending year needs to come after the starting year')
    } else {
      this.count(this.yearValue[0],this.yearValue[1])
    }    
  }

  private snackBarMessage(message: string) {
    this.snackBar.open(message, null, {
        duration: 1000
    });
  }

}
