import { Component } from '@angular/core';
import { LoadingController,NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from "../page";
import { EliteApi } from "../../shared/shared";
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  teams = []

  constructor(public navCtrl: NavController, private navParams: NavParams,
    private eliteApi: EliteApi,private loadingComponet: LoadingController) {
  }

  itemTapped($event,team) {
    this.navCtrl.push(TeamHomePage,team)
  }

  ionViewDidLoad(){
    let selectedTournament = this.navParams.data;

    let loader = this.loadingComponet.create({
      content: 'Breath in Breath out ....',
      spinner: 'circles'
    });
 
    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTournament.id).subscribe(data => {
        console.log('data',data)
        this.teams = data.teams;
        loader.dismiss();
      });
    });

  }

}
