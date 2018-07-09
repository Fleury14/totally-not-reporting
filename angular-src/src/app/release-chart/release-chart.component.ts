import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { take } from 'rxjs/operators';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-release-chart',
  templateUrl: './release-chart.component.html',
  styleUrls: ['./release-chart.component.scss']
})
export class ReleaseChartComponent implements OnInit {
  public showXAxis = true;
  public showYAxis = true;
  // public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Years';
  public showYAxisLabel = true;
  public yAxisLabel = 'Number of Movies';
  public releases: any[] = []


  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  public view: any[] = [700, 400];

  constructor(private _search: SearchService, ) {}

  ngOnInit() {
    this.count(1900,2000, 'cat');
    console.log(this.releases)
  }

  public count(startYear, endYear, category) {
    const search = {
        startYear,
        endYear,
        // category
    }
    this._search.getCountOfYear(search).pipe(take(1)).subscribe((data) => {
        console.log(data)
        data.result.forEach(release => {
          if(release.date_part){
            let obj = {
              name: release.date_part.toString(),
              value: parseInt(release.count)
            };
            this.releases.push(obj);
          }
        });
        console.log(this.releases)
        // Object.assign(this, this.releases);
    });
  }

}
