import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamDetailPage } from "../page";
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  itemTapped(){
    this.navCtrl.push(TeamDetailPage)
  }

}
