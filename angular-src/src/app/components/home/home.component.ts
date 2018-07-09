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

    //  kid friendly
    public showLegend = false;
    public colorScheme = {
        domain: ['#6FC5C1', '#C5354B', '#FFB544', '#99C56F']
      };
    public showLabels = false;
    public explodeSlices = false;
    public doughnut = false;

    // budget
    public budgetColorScheme = {
        domain: ['#fff']
    };
    public xAxis = true;
    public yAxis = true;
    public showXAxis = true;
    public showYAxis = true;

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
            name: "1",
            value: 5422
        },{
            name: "2",
            value: 8912
        },{
            name: "3",
            value: 2500
        },{
            name: "4",
            value: 3652
        },{
            name: "5",
            value: 924
        },{
            name: "6",
            value: 1623
        },{
            name: "7",
            value: 963
        },{
            name: "8",
            value: 3692
        },{
            name: "9",
            value: 952
        },{
            name: "10",
            value: 4520
        }];

        console.log('budget data', this.budgetData);
        Object.assign(this, this.budgetData);
    }
}