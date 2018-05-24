import Immutable from 'seamless-immutable';
import * as types from "./actionTypes";
import _ from 'lodash';

const initialState = Immutable({
    finalLeagueArray: undefined,
    finalDraftArray: undefined,
    selectedTeam: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
    case types.SET_RESULT_DATA:
        return state.merge({
            finalLeagueArray: action.finalLeagueArray,
            finalDraftArray: action.finalDraftArray,
            selectedTeam: action.selectedTeam
        });
    case types.SET_SELECTED_TEAM:
        return state.merge({
            selectedTeam: action.selectedTeam
        });
    default:
        return state;
    }
}

export function getFinalLeagueArray(state) {
    return state.results.finalLeagueArray;
}

export function getFinalDraftArray(state) {
    return state.results.finalDraftArray;
}

export function getSelectedTeam(state){
    return state.results.selectedTeam;
}

export function getTeamList(state) {
    return _.map( ( state.results.finalLeagueArray || {} ).teamInfo, function( team ){
        return { text: team.teamName, key: team.hashKey, value: team.hashKey };
    } );
}