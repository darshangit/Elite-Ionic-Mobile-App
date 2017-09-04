import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from "../../shared/shared";
import * as _ from 'lodash'
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {

  standing: any[]
  allStanding: any[]
  team: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private eliteApi: EliteApi) {
  }

  ionViewDidLoad(){
    this.team = this.navParams.data;
    let tournamentData = this.eliteApi.getCurrentTournament();
    this.standing = tournamentData.standings;

    this.allStanding = _.chain(this.standing)
    .groupBy('division')
    .toPairs()
    .map(item => _.zipObject(['divisionName','divisionStandings'],item))
    .value();

  }

}
