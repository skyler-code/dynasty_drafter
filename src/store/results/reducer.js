import Immutable from 'seamless-immutable';
import * as types from "./actionTypes";
import _ from 'lodash';
import json2csv from 'json2csv';
import moment from 'moment';

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

export function formatDraftResultsCSVName(state){
    const leagueName = ( ( state.results.finalLeagueArray || {} ).leagueName || '' ).replace(/\s/g, '');
    let timestamp = moment().format('MMDDYY-HHmm');
    return "draft-" + leagueName + "-" + timestamp + ".csv";
}

export function getTeamList(state) {
    return _.map( ( state.results.finalLeagueArray || {} ).teamInfo, function( team ){
        return { text: team.teamName, key: team.hashKey, value: team.hashKey };
    } );
}

export function getSelectedTeamInfo(state){
    let draftArray = state.results.finalDraftArray;
    let leagueArray = (state.results.finalLeagueArray || {}).teamInfo;
    let selectedTeam = state.results.selectedTeam;
    if(!leagueArray)
        return [];
    let teamFromLeagueArray = _.find( leagueArray, function(team){
        return team.hashKey === selectedTeam;
    } );
    let draftPicks = _.filter(draftArray, function(pick){
        return pick.ownerHashKey === selectedTeam && pick.Player_Picked;
    } );
    let draftedPlayers = _.map(draftPicks, function(pick){
        let plr = pick.Player_Picked;
        let isDefense = plr.FantasyPosition === 'D/ST';
        return {
            Name: isDefense ? plr.FullTeamName : plr.Name,
            Team: plr.Team,
            FantasyPosition: plr.FantasyPosition
        };
    });
    return _.concat( teamFromLeagueArray.players, draftedPlayers );
}

export function getDraftResultsTable(state){
    return _.map( state.results.finalDraftArray, function( pick ){
        let plr = pick.Player_Picked;
        let isDefense = plr.FantasyPosition === 'D/ST';
        return {
            Player: ( isDefense ? plr.FullTeamName : plr.Name ) + " (" + plr.FantasyPosition + ")",
            Team: pick.Traded_To ? pick.Traded_To.teamName + " (from: " + pick.Original_Owner.teamName + ")" : pick.Original_Owner.teamName,
            hashKey: pick.ownerHashKey
        };
    } );
}

export function getDraftResultCSV(state){
    let currentIndex = 1;
    let mappedResults = _.map( state.results.finalDraftArray, function( pick ){
        let plr = pick.Player_Picked;
        return {
            Pick_Number: currentIndex++,
            Team: pick.Traded_To ? pick.Traded_To.teamName + " (from: " + pick.Original_Owner.teamName + ")" : pick.Original_Owner.teamName,
            Player: plr.Name,
            Player_Team: plr.Team
        };
    } );
    if( mappedResults.length )
        return json2csv.parse( mappedResults );
}