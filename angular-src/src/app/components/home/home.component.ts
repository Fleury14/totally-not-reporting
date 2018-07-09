import { Component, OnInit } from '@angular/core';
// import { IMovie } from '../../interfaces/movie';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit{
    ngOnInit(): void {
        this.setPieChart();
        this.setBudgetData();
    }

    public pieData:any;
    public budgetData: any;


    public showLegend = false;
    // public view: any[] = [500, 400];
    public colorScheme = {
        domain: ['#6FC5C1', '#C5354B', '#FFB544', '#99C56F']
      };
    public showLabels = false;
    public explodeSlices = false;
    public doughnut = false;
    public legendTitle = '';
    // public pieData:any;


    public setPieChart() {
        this.pieData = [{
            name: "Yes",
            value: 6306

        },{
            name: "No",
            value: 1527
        }];

        console.log('pie data', this.pieData);
        Object.assign(this, this.pieData);
    }
    public setBudgetData() {
        this.budgetData =[{
            name: "Over 1 million",
            value: 5422
        },{
            name: "Over 500 thousand",
            value: 8912
        },{
            name: "Less than 500 thousand",
            value: 200
        }];

        console.log('budget data', this.budgetData);
        Object.assign(this, this.budgetData);
    }
}