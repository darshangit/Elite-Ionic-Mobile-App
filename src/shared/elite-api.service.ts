import { Injectable } from "@angular/core";   
import { Http,Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs';

@Injectable()
export class EliteApi {

    private baseUrl = 'https://elite-schedule-ionic-49d7b.firebaseio.com/'
    currentTournamnet: any = {}
    
    constructor(private http:Http){
    }

    getTournaments(){
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/tournaments.json`)
            .subscribe(res => resolve(res.json()));
        });
    }

    getTournamentData(tournamentId): Observable<any>{
        return this.http.get(`${this.baseUrl}/tournaments-data/${tournamentId}.json`)
        .map((response: Response) => {
            this.currentTournamnet = response.json()
            return this.currentTournamnet;
        })
    }

    getCurrentTournament(){
        return this.currentTournamnet;
    }
    
}