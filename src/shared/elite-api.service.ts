import { Injectable } from "@angular/core";   
import { Http,Response } from "@angular/http";

@Injectable()
export class EliteApi {

    private baseUrl = 'https://elite-schedule-ionic-49d7b.firebaseio.com/'

    constructor(private http:Http){

    }

    getTournaments(){
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/tournaments.json`)
            .subscribe(res => resolve(res.json()));
        });
    }
}