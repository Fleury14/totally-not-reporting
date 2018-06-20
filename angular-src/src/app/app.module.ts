import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { RoutingComponents, AppRoutingModule } from './app.routing.module';

import { SearchService } from './services/search.service';
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent, NavComponent, SideBarComponent, RoutingComponents
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, AppRoutingModule, HttpClientModule, MatInputModule, MatButtonModule
  ],
  providers: [ SearchService, HttpService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
