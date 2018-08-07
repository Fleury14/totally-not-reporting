import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdvSearchComponent } from './components/adv-search/adv-search.component';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './components/error/error.component';
import { ResultComponent } from './components/results/results.component';
import { ModalComponent } from './components/results/modal.component';
import { ResultsTableComponent } from './components/results-table/results-table.component';
import { RevenueComponent } from './components/revenue-component/revenue.component';

import { BudgetComponent } from "./components/budget-component/budget.component";

import { ReleaseChartComponent } from './components/release-chart/release-chart.component';
import { KidFriendlyComponent } from './components/kid-friendly-component/kid-friendly-component.component';

import { RunTimeChartComponent } from './components/run-time-chart/run-time-chart.component';
import { CRMTitleComponent } from './components/crm-title/crm-title.component';
import { CRMDetailComponent } from './components/crm-detail/crm-detail.component';


const routes: Route[] = [{
    path: 'home',
    component: HomeComponent
},
{
    path: 'search',
    component: AdvSearchComponent
},
{
    path: 'results',
    component: ResultComponent
},
{
    path: 'results-table',
    component: ResultsTableComponent
},
{
    path: 'revenue',
    component: RevenueComponent
},
{

    path: 'budget',
    component: BudgetComponent
},
{
    path: 'release',
    component: ReleaseChartComponent

},
{
    path: 'run-time',
    component: RunTimeChartComponent
},
{
    path: 'kid-friendly',
    component: KidFriendlyComponent
},
{
    path: 'crm/title',
    component: CRMTitleComponent
},
{
    path: 'crm/detail/:id',
    component: CRMDetailComponent
},
{
    path: 'crm/detail',
    component: CRMDetailComponent
},
{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
},
{
    path: '**',
    component: ErrorComponent
},
{
    path: 'modal',
    component: ModalComponent
}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}

export const RoutingComponents = [HomeComponent, AdvSearchComponent, ErrorComponent, ResultComponent, KidFriendlyComponent,
                                  ModalComponent, ResultsTableComponent, RevenueComponent, BudgetComponent, ReleaseChartComponent,
                                CRMTitleComponent, CRMDetailComponent ];

