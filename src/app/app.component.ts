import { Component, ViewChild } from '@angular/core';
import { Events,Nav, Platform,LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyTeamsPage,TournamentsPage,TeamHomePage } from "../pages/page";
import { UserSettings,EliteApi } from "../shared/shared";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPage;
  favourites: any = []

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen,private userSettings:UserSettings,
    private eliteApi:EliteApi,private loadingController:LoadingController,
  private events: Events) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshFavourites();

      this.events.subscribe('favourites:changed', () => this.refreshFavourites())
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goToTournaments(){
    this.nav.push(TournamentsPage)
  }

  goHome(){
    this.nav.push(MyTeamsPage)
  }

  refreshFavourites(){
    this.favourites = this.userSettings.getAllFavourites();
    console.log('this.favouritesthis.favouritesthis.favourites',this.favourites)
  }

  goToteam(fav){
    let loader = this.loadingController.create({
      content: 'Getting Data ...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(fav.tournamentId).subscribe(l => this.nav.push(TeamHomePage,fav.team))
  }
}
