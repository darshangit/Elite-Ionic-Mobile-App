import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from "../../shared/shared";
import { TeamHomePage } from "../page";

@Component({
  templateUrl: 'game.html',
})
export class GamePage {

  game: any

  constructor(private navCtrl: NavController, private navParams: NavParams,private eliteApi: EliteApi) {
    this.game = this.navParams.data;
    
  }

  ionViewDidLoad(){
    console.log('this.game', this.navParams.data)
  }

  teamTapped(teamId){
    let tournamentData = this.eliteApi.getCurrentTournament();
    let team = tournamentData.teams.find(t => t.id === teamId)
    this.navCtrl.push(TeamHomePage,team)
  }


}
