import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { RoutingComponents, AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent, NavComponent, SideBarComponent, RoutingComponents
  ],
  imports: [
    BrowserModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
