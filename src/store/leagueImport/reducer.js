import Immutable from 'seamless-immutable';
import * as types from "../leagueImport/actionTypes";
import _clone from 'lodash/clone'

const initialState = Immutable({
  allPlayers: undefined,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.PLAYERS_FETCHED:
      return state.merge({
        allPlayers: action.allPlayers
      });
    default:
      return state;
  }
}

export function getPlayers(state) {
  return state.leagueImport.allPlayers;
}

export function getPlayersForView(state) {
  return _clone( state.leagueImport.allPlayers );
}