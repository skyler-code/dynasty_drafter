import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import _clone from "lodash/clone";

const initialState = Immutable({
  leagueArray: undefined,
  availablePlayers: undefined,
  selectedPlayer: undefined,
  selectionFinalized: false,
  draftInProgress: false,
  currentPick: 1,
  draftOrder: undefined,
  secondsPerPick: 90,
  timeLeft: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.DRAFT_STARTED:
            return state.merge({
                draftInProgress: true
            });
        case types.PLAYER_SELECTED:
            return state.merge({
                selectedPlayer: action.selectedPlayer
            });
        case types.PLAYER_SELECTION_MADE:
            return state.merge({
                selectionFinalized: true
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
                secondsPerPick: action.secondsPerPick
            });
        case types.TIMER_TICK:
            return state.merge({
                timeLeft: action.timeLeft
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