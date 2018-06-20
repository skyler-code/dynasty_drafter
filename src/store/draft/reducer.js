import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import moment from 'moment';

const initialState = Immutable({
  leagueArray: undefined, // actually object
  availablePlayers: undefined,
  bestAvailablePlayer: undefined,
  selectedPlayer: undefined,
  draftInProgress: false,
  currentPick: 0,
  draftArray: undefined,
  timeLeft: undefined,
  isDefenseEnabled: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
    case types.DRAFT_STARTED:
        return state.merge({
            draftInProgress: true,
            timeLeft: action.timeLeft,
        });
    case types.PLAYER_SELECTED:
        return state.merge({
            selectedPlayer: action.selectedPlayer
        });
    case types.PLAYER_SELECTION_MADE:
        return state.merge({
            availablePlayers: action.availablePlayers,
            bestAvailablePlayer: action.bestAvailablePlayer,
            leagueArray: action.leagueArray,
            draftArray: action.draftArray,
            selectedPlayer: undefined,
            currentPick: action.currentPick,
            timeLeft: action.timeLeft,
            draftInProgress: action.draftInProgress
        });
    case types.CLEAR_PLAYER_SELECTION:
        return state.merge({
            selectedPlayer: undefined
        });
    case types.SET_INITIAL_DRAFT_DATA:
        return state.merge({
            availablePlayers: action.availablePlayers,
            leagueArray: action.leagueArray,
            draftArray: action.draftArray,
            secondsPerPick: action.secondsPerPick,
            bestAvailablePlayer: action.bestAvailablePlayer,
            currentPick: 0,
            draftInProgress: false,
            timeLeft: action.timeLeft,
            isDefenseEnabled: action.isDefenseEnabled
        });
    case types.TIMER_TICK:
        return state.merge({
            timeLeft: action.timeLeft
        });
    case types.STOP_DRAFT:
        return state.merge({
            draftInProgress: false
        });
    default:
        return state;
    }
}

// selectors

export function getAvailablePlayers(state) {
    return state.draft.availablePlayers;
}

export function getAvailablePlayersForView(state) {
    return _.cloneDeep( state.draft.availablePlayers );
}

export function getDraftArrayForEdit(state){
    return _.cloneDeep( state.draft.draftArray );
}

export function getLeagueArrayForEdit(state){
    return _.cloneDeep( state.draft.leagueArray );
}

export function getSelectedPlayer(state) {
    return state.draft.selectedPlayer;
}

export function getSelectedOrBestPlayer(state) {
    return state.draft.selectedPlayer || state.draft.bestAvailablePlayer;
}

export function isTopicSelectionValid(state) {
    return !!state.draft.selectedPlayer;
}

export function canDraftPlayer(state){
    return !!state.draft.selectedPlayer && state.draft.draftInProgress;
}

export function getBestAvailablePlayer(state){
    return state.draft.bestAvailablePlayer;
}

export function isDraftInProgress(state){
    return state.draft.draftInProgress;
}

export function isDraftFinished(state){
    let lastPick = _.last(state.draft.draftArray) || {};
    return !!lastPick.Player_Picked;
}

export function getTimeLeft(state){
    return state.draft.timeLeft;
}

export function getCurrentPick(state){
    return state.draft.currentPick;
}

export function getCurrentPickForView(state){
    return state.draft.currentPick + 1;
}

export function getDraftStatusLeague(state){
    let draftArray = state.draft.draftArray;
    function formatPlayerName( pick ){
        let plr = pick.Player_Picked;
        return plr ? plr.Name + ( plr.FantasyPosition === 'D/ST' ? "" : " (" + plr.FantasyPosition + ")" ) : "";
    }
    function formatTeamName( pick ){
        return pick.Traded_To ? pick.Traded_To.teamName : pick.Original_Owner.teamName;
    }
    return _.map(draftArray, function( pick ){
        return {
            teamName: formatTeamName(pick),
            playerName: formatPlayerName(pick)
        };
    } );
}

export function getDraftStatusTeam(state){
    let draftArray = state.draft.draftArray || [];
    let currentPick = draftArray[ state.draft.currentPick ];
    if( !currentPick )
        return {};
    let leagueArray = state.draft.leagueArray || {};
    let teamFromLeagueArray = _.find( leagueArray.teamInfo, function(team){
        return team.hashKey === currentPick.ownerHashKey;
    } );
    let draftPicks = _.filter(draftArray, function(pick){
        return pick.ownerHashKey === currentPick.ownerHashKey && pick.Player_Picked;
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

export function getCurrentPickName(state){
    const draftArray = state.draft.draftArray || [];
    const currentPick = draftArray[ state.draft.currentPick ] || {};
    return ( currentPick.Traded_To || {} ).teamName || ( currentPick.Original_Owner || {} ).teamName;
}

export function getNextPickName(state){
    const draftArray = state.draft.draftArray || [];
    const nextPick = draftArray[ state.draft.currentPick + 1 ] || {};
    return ( nextPick.Traded_To || {} ).teamName || ( nextPick.Original_Owner || {} ).teamName;
}

export function getCurrentPickInfo(state){
    const draftArray = state.draft.draftArray || [];
    return _.cloneDeep(draftArray[ state.draft.currentPick ]);
}

export function getCurrentRound(state){
    const numOfTeams = ( state.draft.leagueArray || {} ).teamCount || 0;
    return ~~( state.draft.currentPick / numOfTeams ) + 1;
}

export function getTimeLeftInfo(state){
    let timeLeft = state.draft.timeLeft;
    const secondsPerPick = state.setup.secondsPerPick;
    let timeLeftInfo = {};
    if( timeLeft ){
        timeLeftInfo.timeLeft = timeLeft;
        timeLeftInfo.percentValue = Number( timeLeft ) / Number( secondsPerPick );
        timeLeftInfo.timeLeftString = moment().minute( Math.floor( timeLeft / 60 ) ).second( timeLeft % 60 ).format('m:ss')
    }
    return timeLeftInfo;
}

export function isDefenseEnabled(state){
    return state.draft.isDefenseEnabled;
}