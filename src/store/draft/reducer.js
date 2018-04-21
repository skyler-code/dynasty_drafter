import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  leagueArray: undefined,
  availablePlayers: undefined,
  selectedPlayer: undefined,
  selectionFinalized: false,
  currentPick: 1,
  options: {
    draftOrder: undefined,
    secondsPerPick: 90
  }
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
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
    default:
      return state;
  }
}

// selectors

export function getPlayers(state) {
  return state.draft.playerArray;
}

export function getSelectedPlayer(state) {
  return state.draft.selectedPlayer;
}

export function isTopicSelectionValid(state) {
  return !!state.draft.selectedPlayer;
}

export function isTopicSelectionFinalized(state) {
  return state.draft.selectionFinalized;
}