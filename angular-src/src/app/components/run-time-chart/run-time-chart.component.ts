import { Component, OnInit } from '@angular/core';
import { IMovie } from '../../interfaces/movie';
import { SearchService } from '../../services/search.service';
import { take } from 'rxjs/operators';

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
  public yAxisLabel = 'Number of Movies';
  public releases;
  public data;

  constructor(public _search:SearchService) {}
  public count(startYear, endYear) {
    this.releases = [];
    const search = {
        startYear,
        endYear
    }
    this._search.getCountOfYear(search).pipe(take(1)).subscribe(async (data) => {
        const results = await data['result'];
        console.log(results)
        // results.forEach(release => {
        //   if(release.date_part){
        //     let obj = {
        //       name: release.date_part.toString(),
        //       value: parseInt(release.count)
        //     };
        //     this.releases.push(obj);
        //   }
        // });
        
    });
  }

  ngOnInit() {
    this.count(1900, 1920)
  //   this.data = []
  //   this._search.getYearRange(2000, 2018).pipe( take(1) ).subscribe(response => {
  //     console.log(response.result);
  //     response['result'].forEach((movie:IMovie) => {
  //       let date = new Date(movie.release_date);
  //       let year = date.getFullYear();
  //       if(movie.runtime <30){
  //         const obj = 
  //         {
  //           "name": "0",
  //           "series": [
  //             {
  //               "name": "0",
  //               "x": year,
  //               "y": movie['runtime'] ,
  //               "r": 1
  //             }
  //           ]
  //         };
  //         this.data.push(obj);

  //       } else if(movie.runtime < 60){
  //         let date = new Date(movie.release_date);
  //         let year = date.getFullYear();
  //         const obj = {
  //           "name": "1",
  //           "series": [
  //             {
  //               "name": "1",
  //               "x": year,
  //               "y": movie['runtime'],
  //               "r": 1
  //             }
  //           ]
  //         };
  //         this.data.push(obj);

  //       } else if(movie.runtime < 120){
  //         let date = new Date(movie.release_date);
  //         let year = date.getFullYear();
  //         const obj = {
  //           "name": "2",
  //           "series": [
  //             {
  //               "name": "2",
  //               "x": year,
  //               "y": movie['runtime'],
  //               "r": 1
  //             }
  //           ]
  //         };

  //         this.data.push(obj)

  //       } else if (movie.runtime < 180){
  //         let date = new Date(movie.release_date);
  //         let year = date.getFullYear();
  //         const obj = {
  //           "name": "3",
  //           "series": [
  //             {
  //               "name": "3",
  //               "x": year,
  //               "y": movie['runtime'],
  //               "r": 1
  //             }
  //           ]
  //         };

  //         this.data.push(obj);

  //       } else if (movie.runtime < 210){
  //         let date = new Date(movie.release_date);
  //         let year = date.getFullYear();
  //         const obj = {
  //           "name": "4",
  //           "series": [
  //             {
  //               "name": "4",
  //               "x": year,
  //               "y": movie['runtime'] ,
  //               "r": 1
  //             }
  //           ]
  //         }

  //         this.data.push(obj);

  //       }else if (movie.runtime < 300){
  //         let date = new Date(movie.release_date);
  //         let year = date.getFullYear();
  //         const obj = {
  //           "name": "5",
  //           "series": [
  //             {
  //               "name": "5",
  //               "x": year,
  //               "y": movie['runtime'] ,
  //               "r": 1
  //             }
  //           ]
  //         }

  //         this.data.push(obj);

  //       } else if (movie.runtime < 1050){
  //         let date = new Date(movie.release_date);
  //         let year = date.getFullYear();
  //         const obj = {
  //           "name": "6",
  //           "series": [
  //             {
  //               "name": "6",
  //               "x": year,
  //               "y": movie['runtime'],
  //               "r": 1
  //             }
  //           ]
  //         }

  //         this.data.push(obj);

  //       } else {
  //         let date = new Date(movie.release_date);
  //         let year = date.getFullYear();
  //         const obj = {
  //           "name": "7",
  //           "series": [
  //             {
  //               "name": "7",
  //               "x": year,
  //               "y": movie['runtime'] ,
  //               "r": 1
  //             }
  //           ]
  //         }
  //         this.data.push(obj);
  //       }
  //     })
  //     console.log(this.data);
  //   })
  }
}
