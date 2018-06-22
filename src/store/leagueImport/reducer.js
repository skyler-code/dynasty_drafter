import Immutable from 'seamless-immutable';
import * as types from "./actionTypes";

const initialState = Immutable({
    leagueInput: "",
    parsedLeague: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.LEAGUE_IMPORTED:
            return state.merge( {
                parsedLeague: action.parsedLeague,
                leagueInput: action.leagueInput
            } );
        case types.RESET_STATE:
            return initialState;
        default:
            return state;
  }
}

export function getParsedLeague(state){
    return state.leagueImport.parsedLeague;
}

export function getLeagueName(state){
    return ( state.leagueImport.parsedLeague || {} ).leagueName;
}

export function getLeagueInput(state){
    return state.leagueImport.leagueInput;
}

export function successfulImport(state){
    return !!( state.leagueImport.parsedLeague || {} ).teamCount;
}