// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

import _ from 'lodash';
import * as types from './actionTypes';
import fantasyPlayerService from '../../services/fantasy_data';
import * as playerSelectors from './reducer';

export function fetchPlayers() {
  return async(dispatch, getState) => {
    try {
      const playerArray = await fantasyPlayerService.getFantasyPlayerData();
      dispatch({ type: types.PLAYERS_FETCHED, playerArray: playerArray });
    } catch (error) {
      console.error(error);
    }
  };
}

export function selectPlayer(playerID) {
  return (dispatch, getState) => {
    const players = playerSelectors.getPlayers(getState());
    let newSelectedPlayer = _.find(players, function( plr ){ return plr.PlayerID === playerID } );
    dispatch({ type: types.PLAYER_SELECTED, selectedPlayer: newSelectedPlayer  });
  };
}

export function finalizeTopicSelection() {
  return( { type: types.PLAYER_SELECTION_MADE } );
}

export function clearPlayerSelection() {
  return({ type: types.CLEAR_PLAYER_SELECTION } );
}