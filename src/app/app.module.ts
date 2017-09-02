import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamsPage,TournamentsPage,TeamDetailPage,TeamsPage,GamePage,TeamHomePage,StandingsPage } from "../pages/page";
import { EliteApi } from "../shared/shared";

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamDetailPage,
    TeamsPage,
    GamePage,
    TeamHomePage,
    StandingsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamDetailPage,
    TeamsPage,
    GamePage,
    TeamHomePage,
    StandingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EliteApi
  ]
})
export class AppModule {}
