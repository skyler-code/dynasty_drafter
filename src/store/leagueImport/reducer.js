import Immutable from 'seamless-immutable';
import * as types from "../leagueImport/actionTypes";

const initialState = Immutable({
  leagueInput: "",
  parsedLeague: undefined
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
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

export function getParsedLeague(state){
  return state.leagueImport.parsedLeague;
}