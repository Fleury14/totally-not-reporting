import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable()
export class RecentSearchService {
 public emptylist:any = [];
 public list:any;

 constructor(){}

 public addSearchList(search, entry, method){
    this.list = localStorage.getItem("search list")? JSON.parse(localStorage.getItem("search list")): this.emptylist;
    let lowerCase = search.toLowerCase();
    let capitalize = lowerCase.replace(/^\w/, c => c.toUpperCase());
    let obj = {
        search: capitalize, //whats its going to show
        entry: entry, // parametry it takes in
        method: method // method it uses
    }
    localStorage.getItem("search list")?this.list = JSON.parse(localStorage.getItem("search list")): this.list = this.emptylist;
    // for(let index in obj){ 
    //    if(this.list['index']['entry'] == entry){
    //        break;
    //    }
    // }
    if(this.list.length >= 5){
        this.list.pop();
        this.list.splice(0,0, obj);
        localStorage.setItem("search list",JSON.stringify(this.list));
    } else {
        this.list.splice(0,0, obj);
        localStorage.setItem("search list",JSON.stringify(this.list));
    }
 }

 public getSearchList(){
    let list = JSON.parse(localStorage.getItem("search list"))
    return list
 }
}

