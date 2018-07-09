import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { IMovie } from '../../interfaces/movie';
// import { IMovie } from '../../interfaces/movie';

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
        this.setRuntimeData();
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
        // console.log('tree data lol', this.revenueData);
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

    public setRuntimeData() {
        this.runtimeData = [
            {
              "name": "Germany",
              "series": [
                {
                  "name": "2010",
                  "x": 40632,
                  "y": 80.3,
                  "r": 80.4
                },
                {
                  "name": "2000",
                  "x": 36953,
                  "y": 80.3,
                  "r": 78
                },
                {
                  "name": "1990",
                  "x": 31476,
                  "y": 75.4,
                  "r": 79
                }
              ]
            },
            {
              "name": "USA",
              "series": [
                {
                  "name": "2010",
                  "x": 49737,
                  "y": 78.8,
                  "r": 310
                },
                {
                  "name": "2000",
                  "x": 45986,
                  "y": 76.9,
                  "r": 283
                },
                {
                  "name": "1990",
                  "x": 3706,
                  "y": 75.4,
                  "r": 253
                }
              ]
            },
            {
              "name": "France",
              "series": [
                {
                  "name": "2010",
                  "x": 36745,
                  "y": 81.4,
                  "r": 63
                },
                {
                  "name": "2000",
                  "x": 34774,
                  "y": 79.1,
                  "r": 59.4
                },
                {
                  "name": "1990",
                  "x": 29476,
                  "y": 77.2,
                  "r": 56.9
                }
              ]
            },
            {
              "name": "United Kingdom",
              "series": [
                {
                  "name": "2010",
                  "x": 36240,
                  "y": 80.2,
                  "r": 62.7
                },
                {
                  "name": "2000",
                  "x": 32543,
                  "y": 77.8,
                  "r": 58.9
                },
                {
                  "name": "1990",
                  "x": 26424,
                  "y": 75.7,
                  "r": 57.1
                }
              ]
            }
          ]
          
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