import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';

import { EliteApi } from "../../shared/shared";
import { GamePage } from "../page";

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {


  games: any[];
  team: any;

  private tournamentData: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private eliteApi: EliteApi) {
  }

  // goHome(){
  //   console.log('**parent',this.navCtrl.parent)
  //   this.navCtrl.parent.parent.popToRoot();
  // }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    this.tournamentData = this.eliteApi.getCurrentTournament();

    this.games = _.chain(this.tournamentData.games)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
        let isTeam1 = (g.team1Id === this.team.id);
        let opponentName = isTeam1 ? g.team2 : g.team1;
        let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score)
        return {
          gameId: g.id,
          opponent: opponentName,
          time: Date.parse(g.time),
          location: g.location,
          locationurl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? "vs." : "at")
        };
      })
      .value();

    console.log('games', this.games)
  }

  getScoreDisplay(isTeam1: any, team1Score: any, team2Score: any): any {
    if (team1Score && team2Score) {
      let teamScore = (isTeam1 ? team1Score : team2Score);
      let opponentScore = (isTeam1 ? team2Score : team1Score);
      let winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    }
    else {
      return "";
    }
  }

  gameClicked(event,game){
    let sourceGame = this.tournamentData.games.find(g => g.id === game.gameId);
    console.log('sourceGame',sourceGame);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

}
