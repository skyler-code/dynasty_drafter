// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import _ from 'lodash';
import moment from 'moment';
import playerData from '../data/player_data';
import * as constants from '../data/constants'


const FANTASY_DATA_ENDPOINT = 'https://api.fantasydata.net/v3/nfl/stats/JSON';
class FantasyPlayerService {
  async getFantasyPlayerData() {
    let returnData = playerData.players;
    const playerDataCreationDate = moment( playerData.savedOn );
    if ( playerDataCreationDate.diff(moment(), "days") >= 99999 ){
        const url = `${FANTASY_DATA_ENDPOINT}/Players`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            "Ocp-Apim-Subscription-Key": process.env.REACT_APP_FANTASY_DATA_KEY
          }
        } );
        if (!response.ok) {
          throw new Error(`FantasyPlayerService getFantasyPlayerData failed, HTTP status ${response.status}`);
        }
        returnData = await response.json();
    }
    returnData = _.filter(returnData, function( plr ){ return ( constants.PLAYER_POSITIONS.indexOf(plr.FantasyPosition) !== -1
                                                                && plr.Active
                                                                && plr.Team ) } );
    return _.map( returnData, stripPlayerObject );
  }
}

function stripPlayerObject( plr ){
    return {
        PlayerID: plr.PlayerID,
        Team: plr.Team,
        Number: plr.Number,
        FirstName: plr.FirstName,
        LastName: plr.LastName,
        Name: plr.Name,
        Position: plr.Position,
        Status: plr.Status,
        FantasyPosition: plr.FantasyPosition,
        PhotoUrl: plr.PhotoUrl,
        AverageDraftPosition: plr.AverageDraftPosition,
        Age: plr.Age
    }
}

export default new FantasyPlayerService();