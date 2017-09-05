import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Events } from "ionic-angular";
import * as _ from 'lodash';

@Injectable()
export class UserSettings {

    constructor(private storage: Storage,private events:Events) {

    }

    favouriteTeam(team, tournamentid, tournamentName) {
        let item = { team: team, tournamentId: tournamentid, tournamentName: tournamentName }
        this.storage.set(String(team.id), JSON.stringify(item));
        this.events.publish('favourites:changed');
        console.log('this.storage',this.storage)
    }

    unfavouriteTeam(team){
        this.storage.remove(team.id);
        this.events.publish('favourites:changed');
    }

    isFavouriteTEam(teamId){
        return this.storage.get(String(teamId)).then(value => value ? true: false);
    }

    getAllFavourites(){
        let item= [];
        this.storage.ready().then(val => this.storage.forEach(data => {
        item.push(JSON.parse(data));
        
        }))
        // _.forIn(window.localStorage, (v,k) => {
        //     item.push(JSON.parse(v));
        // })
        console.log('item',item)
        return item
    }
}