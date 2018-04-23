import Immutable from 'seamless-immutable';
import * as types from "./actionTypes";

const initialState = Immutable({
  leagueInput: "",
  parsedLeague: undefined
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.LEAGUE_IMPORTED:
      return state.merge({
        parsedLeague: action.parsedLeague,
        leagueInput: action.leagueInput
      });
    default:
      return state;
  }
}

export function getParsedLeague(state){
  return state.leagueImport.parsedLeague;
}

export function getLeagueInput(state){
  return state.leagueImport.leagueInput;
}