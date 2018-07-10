import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }

}
