import Immutable from 'seamless-immutable';
import * as types from "./actionTypes";
import _ from 'lodash';

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

export function getParsedLeagueView(state){
    let teamInfo = ( state.leagueImport.parsedLeague || {} ).teamInfo;
    let teamList = [];
    let parsedLeagueView = [];
    _.each( teamInfo, function( team ){
        let teamName = team.teamName;
        let hashKey = team.hashKey;
        teamList.push( { text: teamName, key: hashKey, value: hashKey } );
        _.each( team.players, function( plr ){
            parsedLeagueView.push( {
                teamName: teamName,
                hashKey: hashKey,
                playerName: plr.Name,
                position: plr.FantasyPosition
            } );
        } );
    } );
    return { parsedLeagueView: parsedLeagueView, teamList: teamList };
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