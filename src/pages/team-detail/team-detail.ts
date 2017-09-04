import { Component } from '@angular/core';
import { ToastController,AlertController,NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import  * as moment from "moment";
import { EliteApi } from "../../shared/shared";
import { GamePage } from "../page";

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  games: any[];
  team: any;
  teamStanding: any;
  allGames: any[]
  dateFilter: string
  private tournamentData: any;
  useDateFilter: boolean = false;
  isFollowing: boolean = false;

  constructor(private navCtrl: NavController, private navParams: NavParams, private eliteApi: EliteApi,private alertController:AlertController,private toastController:ToastController) {
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
    console.log('this.tournamentData.standings', this.tournamentData.standings)

    this.allGames = this.games;
    this.teamStanding = _.find(this.tournamentData.standings, { 'teamId': this.team.id });
    console.log('this.teamStanding', this.tournamentData.standings)

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

  gameClicked(event, game) {
    let sourceGame = this.tournamentData.games.find(g => g.id === game.gameId);
    console.log('sourceGame', sourceGame);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  dateChanged(){
    if(this.useDateFilter){
      this.games = _.filter(this.allGames, g=> moment(g.time).isSame(this.dateFilter,'day'));
     }
     else{
       this.games=this.allGames;
     }
  }

  getScoreWorL(game){
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getScoreDisplaybadgeClass(game){
    return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
  }

  toggleFollow(){
    if(this.isFollowing){
      let confirm = this.alertController.create({
        title:'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [{
          text:'Yes',
          handler: () => {
            this.isFollowing = false;
            //TODO: persis later
            let toast = this.toastController.create({
              message: 'You have unfollowed this team',
              duration: 2000,
              position: 'bottom'
            })
            toast.present()
          }
        },
      {
        text:'No'
      }]
      });
      confirm.present();
    }
    else{
      this.isFollowing = true;
      //TODO persist
    }
  }

}
