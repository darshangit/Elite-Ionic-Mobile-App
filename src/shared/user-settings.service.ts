import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import * as _ from 'lodash';

@Injectable()
export class UserSettings {

    constructor(private storage: Storage) {

    }

    favouriteTeam(team, tournamentid, tournamentName) {
        let item = { team: team, tournamentId: tournamentid, tournamentName: tournamentName }
        this.storage.set(String(team.id), JSON.stringify(item));

        console.log('this.storage',this.storage)
    }

    unfavouriteTeam(team){
        this.storage.remove(String(team.id));
    }

    isFavouriteTEam(teamId){
        return this.storage.get(String(teamId)).then(value => value ? true: false);
    }

    getAllFavourites(){
        let item= [];
        this.storage.forEach(data => {
            item.push(JSON.parse(data));
        })
        // _.forIn(window.localStorage, (v,k) => {
        //     item.push(JSON.parse(v));
        // })
        console.log('item',item)
        return item
    }
}