import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamsPage } from "../page";

@Component({
  selector: 'page-tournaments',
  templateUrl: './tournaments.html',
})
export class TournamentsPage {

  constructor(private navCtrl: NavController, public navParams: NavParams) {
  }

  itemTapped(){
    this.navCtrl.push(TeamsPage);
  }

}
