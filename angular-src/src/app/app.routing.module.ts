import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdvSearchComponent } from './components/adv-search/adv-search.component';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './components/error/error.component';
import { ResultComponent } from './components/results/results.component';
import { ModalComponent } from './components/results/modal.component';
import { ResultsTableComponent } from './components/results-table/results-table.component';


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

export const RoutingComponents = [HomeComponent, AdvSearchComponent, ErrorComponent, ResultComponent, ModalComponent, ResultsTableComponent];
