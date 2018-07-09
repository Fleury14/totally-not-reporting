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
  public submitYears(yearFormValues) {
    if (yearFormValues.startYear > yearFormValues.endYear) {
        this.snackBarMessage('Ending year needs to come after the starting year')
    } else {
      this.count(yearFormValues.startYear, yearFormValues.endYear);
    }
  }

  private snackBarMessage(message: string) {
    this.snackBar.open(message, null, {
        duration: 1000
    });
  }

}
