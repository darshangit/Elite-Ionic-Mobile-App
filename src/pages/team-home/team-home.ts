import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {  TeamDetailPage, StandingsPage, MyTeamsPage } from "../page";

@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {
  team: any
  teamDetailstab = TeamDetailPage
  standingsTab = StandingsPage

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.team = this.navParams.data
  }

  goHome(){
    this.navCtrl.popToRoot();
  }

}
