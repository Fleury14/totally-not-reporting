import { Component, OnInit } from '@angular/core';
// import { IMovie } from '../../interfaces/movie';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit{
    ngOnInit(): void {
        //different graph methods
        this.setBudgetData();
        this.setRevenueData();
        this.setRuntimeData();
        this.setReleaseDateData();
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
    }

    public setRevenueData(){
        this.revenueData = [{
            name: "1",
            value: 5421
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
        }];
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

    public setReleaseDateData(){
        this.releaseDateData = [{
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
            value: 5963
        },{
            name: "8",
            value: 3692
        },{
            name: "9",
            value: 2952
        },{
            name: "10",
            value: 9520
        }];
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