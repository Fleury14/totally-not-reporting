import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgDragDropModule } from 'ng-drag-drop';



// import { ModalComponent } from './components/modal/modal.component';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { RoutingComponents, AppRoutingModule } from './app.routing.module';
import { ModalComponent } from './components/results/modal.component';
import { ResultComponent } from './components/results/results.component';


import { SearchService } from './services/search.service';
import { HttpService } from './services/http.service';
import { RecentSearchService } from './services/recent-search.service';
import { AppMaterialModule } from './material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RevenueComponent } from './components/revenue-component/revenue.component';

import { BudgetComponent } from "./components/budget-component/budget.component";

import { ReleaseChartComponent } from './components/release-chart/release-chart.component';
import { RunTimeChartComponent } from './components/run-time-chart/run-time-chart.component';
import { NouisliderModule } from 'ng2-nouislider';
import { KidFriendlyComponent } from './components/kid-friendly-component/kid-friendly-component.component';
import { CsvService } from './services/csv.service';


@NgModule({
  declarations: [
    AppComponent, NavComponent, SideBarComponent, RoutingComponents, ResultComponent, ModalComponent, ReleaseChartComponent, KidFriendlyComponent,RunTimeChartComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, AppRoutingModule, AppMaterialModule,
    HttpClientModule, NgxChartsModule, NouisliderModule, NgDragDropModule.forRoot()
  ],
  providers: [ SearchService, HttpService, RecentSearchService, CsvService ],
  entryComponents: [ ModalComponent, RevenueComponent, BudgetComponent ],

  bootstrap: [AppComponent]

})
export class AppModule { }
