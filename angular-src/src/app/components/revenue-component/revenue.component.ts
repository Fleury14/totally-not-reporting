import { Component } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-revenue',
    templateUrl: './revenue.component.html',
    styleUrls: [ './revenue.component.scss' ]
})

export class RevenueComponent implements ErrorStateMatcher {
   
    public startYear: number;
    public endYear: number;

    public yearFormControl = new FormControl('', [
        Validators.min(this.startYear)
    ])

    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }

   
}