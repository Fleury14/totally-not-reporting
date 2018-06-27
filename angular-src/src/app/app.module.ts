import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatToolbarModule, MatMenuModule,
   MatDialog, MatDialogModule, MatCheckboxModule, MatRadioModule, MatSelectModule} from '@angular/material';

import { FormsModule } from '@angular/forms';

// import { ModalComponent } from './components/modal/modal.component';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { RoutingComponents, AppRoutingModule } from './app.routing.module';
import { ModalComponent } from './components/results/modal.component';
import { ResultComponent } from './components/results/results.component';

import { SearchService } from './services/search.service';
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent, NavComponent, SideBarComponent, RoutingComponents, ResultComponent, ModalComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, AppRoutingModule,
    HttpClientModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatToolbarModule, MatMenuModule, MatDialogModule, MatCheckboxModule, MatRadioModule, MatSelectModule
  ],
  providers: [ SearchService, HttpService, MatDialog ],
  entryComponents: [ ModalComponent ],

  bootstrap: [AppComponent]
})
export class AppModule { }
