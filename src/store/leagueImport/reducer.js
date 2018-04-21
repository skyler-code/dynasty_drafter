import Immutable from 'seamless-immutable';
import * as types from "../leagueImport/actionTypes";
import _ from "lodash";

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
  return _.clone( state.leagueImport.allPlayers );
}