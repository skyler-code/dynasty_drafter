// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import _ from 'lodash';
import moment from 'moment';
import playerData from '../data/player_data';


const FANTASY_DATA_ENDPOINT = 'https://api.fantasydata.net/v3/nfl/stats/JSON';
class FantasyPlayerService {
  async getFantasyPlayerData() {
    let returnData = playerData.players;
    const playerDataCreationDate = moment( playerData.savedOn );
    if ( playerDataCreationDate.diff(moment(), "days") >= 5 ){
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
    returnData = _.take(returnData, 20);
    return returnData;
  }

}

export default new FantasyPlayerService();