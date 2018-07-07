import { Component, ViewChild, OnInit } from '@angular/core';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { take } from 'rxjs/operators';
import { IMovie } from '../../interfaces/movie';

@Component({
    selector: 'app-revenue',
    templateUrl: './revenue.component.html',
    styleUrls: [ './revenue.component.scss' ]
})

export class RevenueComponent implements OnInit {
   
    @ViewChild('yearForm') private _yearForm: NgForm;
    public startYear: number;
    public endYear: number;
    public searchResults: IMovie[];
    public showResults = false;

    // PIE CHART OPTIONS
     public showLegend = true;
     public view: any[] = [700, 400];
     public colorScheme = {
         domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
       };
     public showLabels = true;
     public explodeSlices = false;
     public doughnut = true;
     public pieData:any;
     public gradient = true;

     // results vars
     public topFive: IMovie[];

     // bar options
     public barData;
     public barDataTwo;
     public barShowXAxis = true;
     public barShowYAxis = true;
     public barGradient = true;
     public barShowLegend = false;
     public barShowXAxisLabel = true;
     public barXAxisLabel = 'Year';
     public barShowYAxisLabel = true;
     public barYAxisLabel = "Revenue";
     public barColorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
      };

     // tree optios
     public treeData: any[];
     public treeColorScheme = {
        domain: ['rgb(102, 189, 109)', 'rgb(250, 197, 29)', 'rgb(250, 160, 38)', 'rgb(41, 187, 156)', 'rgb(233, 107, 86)', 'rgb(85, 172, 210)']
      };

    // heatmap options
    public heatMapData: any[];
    public heatXAxisLabel = 'Year';
    public heatYAxisLabel = 'Month';
    public heatColorScheme = {
        domain: ['violet', 'dodgerblue', '#5AA454', '#C7B42C', '#A10A28']
      };
    public heatGradient = false;
    

    constructor(private _search: SearchService, public snackBar: MatSnackBar) {}

    ngOnInit(): void {
    }


   public submitYears(yearFormValues) {
       if (yearFormValues.startYear > yearFormValues.endYear) {
           this.snackBarMessage('Ending year needs to come after the starting year')
       } else {
        this.toggleDisplay();
        this._search.getYearRange(yearFormValues.startYear, yearFormValues.endYear).pipe( take(1) ).subscribe(response => {
            this.searchResults = response.result;
            this.setPieChart();
            this.topFive = this._getTopFive(this.searchResults);
            this._organizeBarData(yearFormValues.startYear, yearFormValues.endYear, this.searchResults);
            this._treeData(this.searchResults);
            this._heatMapSetup(yearFormValues.startYear, yearFormValues.endYear, this.searchResults);
            // console.log(response);
        });
       }
       
       
   }

   public toggleDisplay() {
       document.querySelector('.revenue-top-row').classList.toggle('hide-stuff');
       document.querySelector('.toggle-year').classList.toggle('hide-stuff');
       this.showResults = !this.showResults;
       console.log(`show results is now ${this.showResults}`);
   }

   private snackBarMessage(message: string) {
       this.snackBar.open(message, null, {
           duration: 1000
       });
   }

   public setPieChart() {
        this.pieData = [{
            name: "Under 50 million",
            value: 0
        },{
            name: "Between 50 and 150 million",
            value: 0
        }, {
            name: "Over 150 million",
            value: 0
        }]
        this.searchResults.forEach( (movie:IMovie) => {
            if (movie.revenue > 150000000) {
                this.pieData[2].value++;
            } else if (movie.revenue > 50000000 ) {
                this.pieData[1].value++;
            } else if (movie.revenue > 0) {
                this.pieData[0].value++;
            }
        });
        console.log('pie data', this.pieData);
        Object.assign(this, this.pieData)
    }

    private _getTopFive(movies: IMovie[]): IMovie[] {
        movies.sort( (a, b) => {return b.revenue - a.revenue});
        return movies.slice(0, 5);
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

    public onSelect(event:any) {
        console.log(event);
    }

    private _organizeBarData(startYear:number, endYear:number, movies:IMovie[]) {
        this.barData = [];
        this.barDataTwo = [];
        for (let year = startYear; year <= endYear; year++) {
            const yearData:IMovie[] = movies.filter( (movie:IMovie) => {
                const dateCheck = new Date(movie.release_date);
                return dateCheck.getFullYear() === year;
            });
            let yearlyRevenues:number[] = [];
            yearData.forEach(movie => yearlyRevenues.push(movie.revenue));
            const yearPeak = Math.max(...yearlyRevenues);
            const yearAvg = yearlyRevenues.reduce( (a, b) => a + b, 0) / yearlyRevenues.length;
            const yearObj = {
                name: year,
                value: yearAvg
            };
            this.barData.push(yearObj);
            const peakObj = {
                name: year,
                value: yearPeak
            };
            this.barDataTwo.push(peakObj);
        }
        console.log('bar data', this.barData);
    }

    private _treeData(movies:IMovie[]) {
        this.treeData = [];
        movies.forEach(movie => this.treeData.push({name: movie.title, value: movie.revenue - movie.budget}));
        if (this.treeData.length > 50) {
            let otherArr = this.treeData.slice(50);
            let sum = 0;
            const otherLength = this.treeData.length - 50;
            otherArr.forEach(movie => sum += movie.value);
            this.treeData.splice(50);
            this.treeData.push({name: `${otherLength} others`, value: sum});
        }
        this.treeData.splice(20);
        console.log('tree data lol', this.treeData);
    }

    private _heatMapSetup(startYear: number, endYear: number, movies:IMovie[]) {
        this.heatMapData = [];
        for (let year = startYear; year <= endYear; year++) {
            const yearData:IMovie[] = movies.filter( (movie:IMovie) => {
                const dateCheck = new Date(movie.release_date);
                return dateCheck.getFullYear() === year;
            });
            let monthlyAverages:number[] = [];
            for (let month = 0; month < 12; month++) {
                const monthlyData:IMovie[] = yearData.filter( (movie:IMovie) => {
                    const thisMonth = new Date(movie.release_date);
                    return thisMonth.getMonth() === month;
                } )
                // console.log('month number', monthlyData);
                const monthlyRevValues:number[] = monthlyData.map( (movie:IMovie) => movie.revenue );
                const monthlyAvg:number = monthlyRevValues.reduce( (a, b) => a + b, 0 ) / monthlyRevValues.length;
                monthlyAverages.push(monthlyAvg);
            }
            // console.log('monthly average', monthlyAverages);
            const yearObj = {
                name: year,
                series: [{
                    name: 'January',
                    value: monthlyAverages[0]
                },{
                    name: 'February',
                    value: monthlyAverages[1]
                },{
                    name: 'March',
                    value: monthlyAverages[2]
                },{
                    name: 'April',
                    value: monthlyAverages[3]
                },{
                    name: 'May',
                    value: monthlyAverages[4]
                },{
                    name: 'June',
                    value: monthlyAverages[5]
                },{
                    name: 'July',
                    value: monthlyAverages[6]
                },{
                    name: 'August',
                    value: monthlyAverages[7]
                },{
                    name: 'September',
                    value: monthlyAverages[8]
                },{
                    name: 'October',
                    value: monthlyAverages[9]
                },{
                    name: 'November',
                    value: monthlyAverages[10]
                },{
                    name: 'December',
                    value: monthlyAverages[11]
                },]
            }
            this.heatMapData.push(yearObj);
        }
    }
}