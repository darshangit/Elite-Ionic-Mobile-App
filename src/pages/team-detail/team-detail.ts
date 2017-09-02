import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  team: any;
  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.team = this.navParams.data;
    console.log('team',this.team)
  }

  // goHome(){
  //   console.log('**parent',this.navCtrl.parent)
  //   this.navCtrl.parent.parent.popToRoot();
  // }

}
