import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { IMovie } from '../../interfaces/movie';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit{
    ngOnInit(): void {
        this._search.getYearRange(1900, 2017).subscribe(response => {
            if(response.result) {
                this.allMovieResults = response.result;
                this.setRevenueData(this.allMovieResults);
                this.setBudgetData(this.allMovieResults);
                this.setReleaseDateData(this.allMovieResults);

            }
        })
        //different graph methods
        this.setRuntimeData(2000,2017);
        this.setKidFriendlyData();
    }
    // different graph variables
    public budgetData: any;
    public revenueData: any;
    public runtimeData: any;
    public releaseDateData: any;
    public kidFriendlyData:any;


    //global 
    public multiColorScheme = {
        domain: ['#6FC5C1', '#C5354B', '#FFB544', '#99C56F']
      };
    public whiteColorScheme = {
        domain: ['#fff']
    };
    public allMovieResults: IMovie[];

    // budget
    public xAxis = true;
    public yAxis = true;
    public showXAxis = true;
    public showYAxis = true;

    //revenue

    //runtime
    
    //release date

    //  kid friendly
    public showLegend = false;
    public showLabels = false;
    public explodeSlices = false;
    public doughnut = false;

    constructor (private _search: SearchService) {}


    public setBudgetData(movies:IMovie[]) {
        this.budgetData = [{
            name: "40m",
            value: 0
        },{
            name: "80m",
            value: 0
        },{
            name: "120m",
            value: 0
        },{
            name: "160m",
            value: 0
        },{
            name: "2000m",
            value: 0
        },{
            name: "240m",
            value: 0
        },{
            name: "280m",
            value: 0
        }];
        movies.forEach( (movie:IMovie) => {
            if (movie.budget > 30000000) {
                let movieIndex = Math.floor(movie.budget / 40000000) - 1;
                movieIndex = movieIndex > 6 ? 6 : movieIndex;
                // console.log(movieIndex, this.budgetData[movieIndex]['value']);
                if (this.budgetData[movieIndex] !== undefined) {
                    this.budgetData[movieIndex]['value']++;
                }
            }
        })
    }

    public setRevenueData(movies:IMovie[]){
        this.revenueData = [];
        movies.forEach(movie => {
            if (movie.budget && movie.revenue && movie.title) {
                this.revenueData.push({name: movie.title, value: movie.revenue - movie.budget});
            }
        } );
        this.revenueData.sort( (a, b) => b.value - a.value);
        if (this.revenueData.length > 8) {
            this.revenueData.splice(8);
        }
    }

    public millions(num: number): string {
        if (typeof num != 'number') {
            if (num['value']) { num = num['value']}
            else if (num['cell']) { num = num['cell']['value']}
        } // account for the graphs not passing a number
        if(num < 1000000000) {
            return '$' + Math.round(num * 10 / 1000000) / 10 + 'm';
        } else {
            return '$' + Math.round(num * 10 / 1000000000) / 10 + 'b';
        }
    }

    public setRuntimeData(startYear, endYear) {
        this.runtimeData= []
        const search = {
            startYear,
            endYear
        }
        this._search.getRunTimeOfYear(search).pipe(take(1)).subscribe(async (data) => {
            const results = await data['result'];
            results.forEach(movie => {
              if((movie['date_part'] &&  movie['count'] && movie['runtime']) && movie['runtime'] < 300 && parseInt(movie['count']) < 70){
                const obj = {
                    "name": `${movie['date_part']}`,
                    "series": [
                      {
                        "name":`${movie['date_part']}`,
                        "x": movie['runtime'],
                        "y": parseInt(movie['count']),
                        "r": 1
                      }
                    ]
                  };
                  this.runtimeData.push(obj);
                };
              }) 
   
        });
    }

    public setReleaseDateData(movies: IMovie[]){
        this.releaseDateData = [{
            name: "50s",
            value: 0
        },{
            name: "60s",
            value: 0
        },{
            name: "70s",
            value: 0
        },{
            name: "80s",
            value: 0
        },{
            name: "90s",
            value: 0
        },{
            name: "00s",
            value: 0
        },{
            name: "10s",
            value: 0
        }];
        movies.forEach( (movie:IMovie) => {
            let movieDate = new Date(movie.release_date);
            let index = Math.floor( movieDate.getFullYear() / 10 ) - 195;
            if (index >= 0 ) {
                this.releaseDateData[index]['value']++;
            }
        })
    }

    public setKidFriendlyData() {
        this.kidFriendlyData = [{
            name: "Yes",
            value: 6306

        },{
            name: "No",
            value: 1527
        }];
    }
}