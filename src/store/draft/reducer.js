// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  playerArray: undefined,
  selectedPlayer: undefined,
  selectionFinalized: false
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.PLAYERS_FETCHED:
      return state.merge({
        playerArray: action.playerArray
      });
    case types.PLAYER_SELECTED:
      return state.merge({
        selectedPlayer: action.selectedPlayer
      });
    case types.PLAYER_SELECTION_MADE:
      return state.merge({
        selectionFinalized: true
      });
    case types.CLEAR_PLAYER_SELECTION:
      return state.merge({
        selectedPlayer: undefined
      });
    default:
      return state;
  }
}

// selectors

export function getPlayers(state) {
  return state.draft.playerArray;
}

export function getPlayersMinimized(state) {
  return _.map( state.draft.playerArray, function( player ){
    return {
      PlayerID: player.PlayerID,
      Team: player.Team,
      FantasyPosition: player.FantasyPosition,
      PhotoUrl: player.PhotoUrl,
      Name: player.Name
    }
  } );
}

export function getSelectedPlayer(state) {
  return state.draft.selectedPlayer;
}

export function getSelectedPlayerID(state) {
  return ( state.draft.selectedPlayer || {} ).PlayerID;
}

export function isTopicSelectionValid(state) {
  return !!state.draft.selectedPlayer;
}

export function isTopicSelectionFinalized(state) {
  return state.draft.selectionFinalized;
}