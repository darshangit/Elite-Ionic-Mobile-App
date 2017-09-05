import { Component } from "@angular/core";
import { LoadingController,NavController } from "ionic-angular";
import { TournamentsPage, TeamHomePage } from "../page";
import { EliteApi,UserSettings } from "../../shared/shared";

@Component({
    selector: 'my-teams-page',
    templateUrl: './my-teams.page.html'
})
export class MyTeamsPage{

    favourites = []
    constructor(private nav: NavController,private loadingController: LoadingController,
        private eliteApi: EliteApi,private userSettings: UserSettings){

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

    ionViewDidEnter(){
        console.log('didEnter')
        this.favourites = this.userSettings.getAllFavourites();
        console.log('didEnter: this.favourites',this.favourites)
        
    }
}