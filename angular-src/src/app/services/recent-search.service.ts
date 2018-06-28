import { Injectable } from '@angular/core';

@Injectable()
export class RecentSearchService {
 public emptylist:any = [];
 public list:any;
 private copy: boolean;
//  private spacedEndpoint: string;

 constructor(){}

 public addSearchList(search, endpoint){
    this.list = localStorage.getItem("search list")? JSON.parse(localStorage.getItem("search list")): this.emptylist;
    let spacedEndpoint = endpoint.includes('-') ? endpoint.replace('-', ' ') : endpoint;
    let spacedSearch = search.includes('_') ? search.replace('_', ' ') : search;
    let view = spacedEndpoint.concat(`: ${spacedSearch}`);
    let obj = {
        search: spacedSearch, 
        endpoint: spacedEndpoint,
        view
    };
    localStorage.getItem("search list")?this.list = JSON.parse(localStorage.getItem("search list")): this.list = this.emptylist;
    
    for(let i = 0; i < this.list.length; i++){
        if(this.list[i]['search'] == spacedSearch){
            this.copy = true;
        };
    }

    if (this.copy){
        return
    } else if(this.list.length >= 5){
        this.list.pop();
        this.list.splice(0,0, obj);
        localStorage.setItem("search list",JSON.stringify(this.list));
    } else {
        this.list.splice(0,0, obj);
        localStorage.setItem("search list",JSON.stringify(this.list));
    }
 }

 public getSearchList(){
    let list = JSON.parse(localStorage.getItem("search list"));
    return list
 }
}
