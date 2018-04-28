import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import _clone from 'lodash/clone';

const initialState = Immutable({
  leagueArray: undefined,
  availablePlayers: undefined,
  selectedPlayer: undefined,
  draftInProgress: false,
  currentPick: 1,
  draftOrder: undefined,
  timeLeft: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
    case types.DRAFT_STARTED:
        return state.merge({
            draftInProgress: true,
            timeLeft: action.timeLeft
        });
    case types.PLAYER_SELECTED:
        return state.merge({
            selectedPlayer: action.selectedPlayer
        });
    case types.PLAYER_SELECTION_MADE:
        return state.merge({
        });
    case types.CLEAR_PLAYER_SELECTION:
        return state.merge({
            selectedPlayer: undefined
        });
    case types.SET_INITIAL_DRAFT_DATA:
        return state.merge({
            availablePlayers: action.availablePlayers,
            leagueArray: action.leagueArray,
            draftOrder: action.draftOrder,
            secondsPerPick: action.secondsPerPick,
            currentPick: 1,
            draftInProgress: false,
            selectedPlayer: undefined
        });
    case types.TIMER_TICK:
        return state.merge({
            timeLeft: action.timeLeft
        });
    case types.STOP_DRAFT:
        console.log("types.STOP_DRAFT")
        return state.merge({
            draftInProgress: false
        });
    default:
        return state;
    }
}

// selectors

export function getPlayers(state) {
    return state.draft.availablePlayers;
}

export function getPlayersForView(state) {
    return _clone( state.draft.availablePlayers );
}
export function getSelectedPlayer(state) {
    return state.draft.selectedPlayer;
}

export function isTopicSelectionValid(state) {
    return !!state.draft.selectedPlayer;
}

export function canDraftPlayer(state){
    return !!state.draft.selectedPlayer && state.draft.draftInProgress;
}

export function isDraftInProgress(state){
    return state.draft.draftInProgress;
}

export function getTimeLeft(state){
    return state.draft.timeLeft;
}

export function getTimeLeftInfo(state){
    const timeLeft = state.draft.timeLeft;
    const secondsPerPick = state.setup.secondsPerPick;
    let timeLeftInfo = { timeLeft: timeLeft };
    if( timeLeft ){
        timeLeftInfo.secondsLeft = timeLeft;
        timeLeftInfo.percentValue = Number( timeLeft ) / Number( secondsPerPick );
        timeLeftInfo.timeLeftString = timeLeft + "";
    }
    return timeLeftInfo;
}