import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamsPage } from "../page";
import { EliteApi } from "../../shared/elite-api.service";

@Component({
  selector: 'page-tournaments',
  templateUrl: './tournaments.html',
})
export class TournamentsPage {

  tournaments: any
  constructor(private navCtrl: NavController, public navParams: NavParams,private eliteApi: EliteApi) {
  }

  itemTapped(event,item){
    this.navCtrl.push(TeamsPage,item);
  }

  ionViewDidLoad(){
    this.eliteApi.getTournaments().then(data => this.tournaments = data);
    console.log('# ionViewDidLoad')
  }

  // ionViewWillEnter(){
  //   console.log('# ionViewWillEnter')
    
  // }

  // ionViewDidEnter(){
  //   console.log('# ionViewDidEnter')
    
  // }

  // ionViewWillLeave(){
  //   console.log('# ionViewWillLeave')
    
  // }

  // ionViewDidLeave(){
  //   console.log('# ionViewDidLeave')
    
  // }

  // ionViewWillUnload(){
  //   console.log('# ionViewWillUnload')
    
  // }

  // ionViewDidUnload(){
  //   console.log('# ionViewDidUnload')
    
  // }

}
