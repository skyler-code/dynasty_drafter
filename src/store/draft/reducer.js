import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import _clone from 'lodash/clone';
import moment from 'moment';
import momentDuration from 'moment-duration-format'
momentDuration(moment);

const initialState = Immutable({
  leagueArray: undefined,
  availablePlayers: undefined,
  bestAvailablePlayer: undefined,
  selectedPlayer: undefined,
  draftInProgress: false,
  currentPick: 0,
  draftArray: undefined,
  timeLeft: undefined
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
            selectedPlayer: undefined
        });
    case types.TIMER_TICK:
        return state.merge({
            timeLeft: action.timeLeft
        });
    case types.PICK_TIME_EXPIRED:
        return state.merge({

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
    return _clone( state.draft.availablePlayers );
}

export function getDraftArrayForEdit(state){
    return _clone( state.draft.draftArray );
}

export function getLeagueArrayForEdit(state){
    return _clone( state.draft.leagueArray );
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

export function getTimeLeft(state){
    return state.draft.timeLeft;
}

export function getCurrentPick(state){
    return state.draft.currentPick;
}

export function getCurrentPickInfo(state){
    const draftArray = state.draft.draftArray || [];
    return _clone(draftArray[ state.draft.currentPick ]);
}

export function getTimeLeftInfo(state){
    const timeLeft = state.draft.timeLeft;
    const secondsPerPick = state.setup.secondsPerPick;
    let timeLeftInfo = { timeLeft: timeLeft };
    if( timeLeft ){
        timeLeftInfo.secondsLeft = timeLeft;
        timeLeftInfo.percentValue = Number( timeLeft ) / Number( secondsPerPick );
        timeLeftInfo.timeLeftString = moment.duration( timeLeft, "seconds" ).format( "mm:ss", { trim: false } );
    }
    return timeLeftInfo;
}