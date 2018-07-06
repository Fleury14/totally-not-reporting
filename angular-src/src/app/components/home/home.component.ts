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
    }

    public pieData:any;
    private _rawResults: any;
    public showLegend = false;
    public view: any[] = [700, 400];
    public colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
      };
    public showLabels = true;
    public explodeSlices = false;
    public doughnut = false;
    // public pieData:any;


    public setPieChart() {
        this.pieData = [{
            name: "Yes",
            value: 6306

        },{
            name: "No",
            value: 527
        }];
        // this._rawResults.forEach( (movie:IMovie) => {
        //     if (movie.revenue > 150000000) {
        //         this.pieData[2].value++;
        //     } else if (movie.revenue > 50000000 ) {
        //         this.pieData[1].value++;
        //     } else if (movie.revenue > 0) {
        //         this.pieData[0].value++;
        //     }
        // });
        console.log('pie data', this.pieData);
        Object.assign(this, this.pieData);
    }
}