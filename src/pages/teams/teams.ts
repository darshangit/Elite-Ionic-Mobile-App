import { Component } from '@angular/core';
import { LoadingController,NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from "../page";
import { EliteApi } from "../../shared/shared";
import * as _ from 'lodash';
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  private allTeams: any
  private allTeamsDivision: any
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
        this.allTeams = data.teams
        this.allTeamsDivision = _.chain(data.teams)
        .groupBy('division')
        .toPairs()
        .map(item => _.zipObject(['divisionName','divisionTeams'],item))
        .value();
        this.teams = this.allTeamsDivision;
        console.log('diviosnteams',this.teams)
        loader.dismiss();
      });
    });

  }

}
