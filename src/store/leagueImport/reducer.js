import Immutable from 'seamless-immutable';
import * as types from "../leagueImport/actionTypes";
import _clone from 'lodash/clone'

const initialState = Immutable({
  allPlayers: undefined,
  leagueInput: "",
  parsedLeague: undefined
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.PLAYERS_FETCHED:
      return state.merge({
        allPlayers: action.allPlayers
      });
    case types.LEAGUE_IMPORTED:
      return state.merge({
        parsedLeague: action.parsedLeague
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

export function getParsedLeague(state){
  return state.leagueImport.parsedLeague;
}