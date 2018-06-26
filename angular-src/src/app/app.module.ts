import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatToolbarModule, MatMenuModule, MatDialog, MatDialogModule} from '@angular/material';

import { FormsModule } from '@angular/forms';

// import { ModalComponent } from './components/modal/modal.component';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { RoutingComponents, AppRoutingModule } from './app.routing.module';
import { ModalComponent } from './components/results/results.component';
import { ResultComponent } from './components/results/results.component';


import { SearchService } from './services/search.service';
import { HttpService } from './services/http.service';
import { RecentSearchService } from './services/recent-search.service';

@NgModule({
  declarations: [
    AppComponent, NavComponent, SideBarComponent, RoutingComponents, ResultComponent, ModalComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, AppRoutingModule, HttpClientModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatToolbarModule, MatMenuModule, MatDialogModule
  ],
  providers: [ SearchService, HttpService, MatDialog, RecentSearchService  ],
  entryComponents: [ ModalComponent ],

  bootstrap: [AppComponent]
})
export class AppModule { }
