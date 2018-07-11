import { Component, ViewChild, OnInit } from "@angular/core";
import { ErrorStateMatcher, MatSnackBar } from "@angular/material";
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { SearchService } from "../../services/search.service";
import { take } from "rxjs/operators";
import { IMovie } from "../../interfaces/movie";

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: ['./budget.component.scss']
})

export class BudgetComponent implements OnInit {

    @ViewChild('yearForm') private _yearForm: NgForm;
    public startYear: number;
    public endYear: number;
    public searchResults: IMovie[];
    public showResults = false;

    // Slider options
    public yearValue = [2000, 2005]
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

    // Bar chart options
    public barData;
    public barDataTwo;
    public barShowXAxis = true;
    public barShowYAxis = true;
    public barGradient = false;
    public barShowLegend = false;
    public barShowXAxisLabel = true;
    public barXAxisLabel = 'Year';
    public barShowYAxisLabel = true;
    public barYAxisLabel = "Budget";
    public barColorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    constructor(private _search: SearchService, public snackBar: MatSnackBar) { }

    ngOnInit(): void {
    }

    public submitYears() {
        let yearFormValues = {
            startYear: this.yearValue[0],
            endYear: this.yearValue[1]
        }
        if (yearFormValues.startYear > yearFormValues.endYear) {
            this.snackBarMessage('Ending year needs to come after the starting year');
        } else {
            this.toggleDisplay();
            this._search.getYearRange(yearFormValues.startYear, yearFormValues.endYear).pipe(take(1)).subscribe(response => {
                this.searchResults = response.result;
                // this.setPieChart();
                this._organizeBarData(yearFormValues.startYear, yearFormValues.endYear, this.searchResults);
            })
        }
    }

    public toggleDisplay() {
        document.querySelector('.revenue-top-row').classList.toggle('hide-stuff');
        document.querySelector('.toggle-year').classList.toggle('hide-stuff');
        this.showResults = !this.showResults;
    }

    private snackBarMessage(message: string) {
        this.snackBar.open(message, null, {
            duration: 5000
        })
    }

    private _organizeBarData(startYear: number, endYear: number, movies: IMovie[]) {
        this.barData = [];
        this.barDataTwo = [];
        for (let year = startYear; year <= endYear; year++) {
            const yearData: IMovie[] = movies.filter((movie: IMovie) => {
                const dateCheck = new Date(movie.release_date);
                return dateCheck.getFullYear() === year;
            });
            let yearlyBudget: number[] = [];
            yearData.forEach(movie => yearlyBudget.push(movie.budget));
            const yearPeak = Math.max(...yearlyBudget);
            const yearAvg = yearlyBudget.reduce((a, b) => a + b, 0) / yearlyBudget.length;
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
    }
}