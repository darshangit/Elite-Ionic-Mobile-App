import { Component } from '@angular/core';
import { LoadingController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamsPage } from "../page";
import { EliteApi } from "../../shared/elite-api.service";

@Component({
  selector: 'page-tournaments',
  templateUrl: './tournaments.html',
})
export class TournamentsPage {

  tournaments: any
  constructor(private navCtrl: NavController, public navParams: NavParams,private eliteApi: EliteApi,private loadingController: LoadingController) {
  }

  itemTapped(event,item){
    this.navCtrl.push(TeamsPage,item);
  }

  ionViewDidLoad(){
    let loader = this.loadingController.create({
      content: 'Getting Tournaments....',
      spinner:  'dots'
    });

    loader.present().then(() => {
      this.eliteApi.getTournaments().then(data => { 
        this.tournaments = data;
        loader.dismiss();
      });
      
    });
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
