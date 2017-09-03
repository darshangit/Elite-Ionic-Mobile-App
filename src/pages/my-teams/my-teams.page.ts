import { Component } from "@angular/core";
import { LoadingController,NavController } from "ionic-angular";
import { TournamentsPage, TeamHomePage } from "../page";
import { EliteApi } from "../../shared/shared";

@Component({
    templateUrl: './my-teams.page.html'
})
export class MyTeamsPage{

    favourites = [
        {
            team: {id: 6182,name: 'HC Elite 7th',coach: 'Dash'},
            tournamentId:'89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
            tournamentName: 'March Madness Tournament'
        }

    ]
    constructor(private nav: NavController,private loadingController: LoadingController,private eliteApi: EliteApi){

    }

    goToTournaments(){
        this.nav.push(TournamentsPage)
    }

    favouriteTapped($event, favourite){
        let loader = this.loadingController.create({
            content: 'Getting Data....',
            dismissOnPageChange: true
        });

        loader.present().then(() => {
            this.eliteApi.getTournamentData(favourite.tournamentId)
            .subscribe(t => this.nav.push(TeamHomePage,favourite.team));
        })
    }
}