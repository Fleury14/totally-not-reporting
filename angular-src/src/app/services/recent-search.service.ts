import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class RecentSearchService {
 public emptylist:any = [];
 public list:any;

 constructor(){}

 public searchList(search){
    localStorage.getItem("search list")?this.list = JSON.parse(localStorage.getItem("search list")): this.list = this.emptylist
    console.log(typeof this.list)
    console.log(this.list.length)
    if(this.list.length >= 5){
        this.list.pop();
        this.list.splice(0, 0, search);
        localStorage.setItem("search list",JSON.stringify(this.list))
    } else {
        this.list.splice(0,0,search);
        localStorage.setItem("search list",JSON.stringify(this.list))
    }
 }

 public getSearchList(){
    let list = JSON.parse(localStorage.getItem("search list"))
    return list
 }
}