// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

import _ from 'lodash';
import * as types from './actionTypes';
import * as playerSelectors from './reducer';
import * as importSelectors from '../leagueImport/reducer';

export function selectPlayer(playerID) {
  return (dispatch, getState) => {
    const players = importSelectors.getPlayers(getState());
    let newSelectedPlayer = _.find(players, function( plr ){ return plr.PlayerID === playerID } );
    dispatch({ type: types.PLAYER_SELECTED, selectedPlayer: newSelectedPlayer  });
  };
}
export function pickPlayer(playerID) {
  return (dispatch, getState) => {
    const players = importSelectors.getPlayers(getState());
    let newSelectedPlayer = _.find(players, function( plr ){ return plr.PlayerID === playerID } );
    dispatch({ type: types.PLAYER_SELECTION_MADE, selectedPlayer: newSelectedPlayer  });
  };
}

export function finalizeTopicSelection() {
  return( { type: types.PLAYER_SELECTION_MADE } );
}

export function clearPlayerSelection() {
  return({ type: types.CLEAR_PLAYER_SELECTION } );
}