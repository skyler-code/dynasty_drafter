// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

import _ from 'lodash';
import * as types from './actionTypes';
import * as draftSelectors from './reducer';
import * as importSelectors from '../leagueImport/reducer';
import * as setupSelectors from '../setup/reducer';
import espnParserService from "../../services/espn_parser";
import fantasyPlayerService from "../../services/fantasy_data";

export function startDraft(){
    return (dispatch, getState) => {
        const secondsPerPick = setupSelectors.getSecondsPerPick( getState() );
        dispatch( { type: types.DRAFT_STARTED, timeLeft: secondsPerPick } );
    };
}

export function setInitialDraftData(){
    return async(dispatch, getState) => {
        try {
            const playerArray = await fantasyPlayerService.getFantasyPlayerData();
            const leagueArray = importSelectors.getParsedLeague( getState() ) || {};
            const draftArray = setupSelectors.getFinalDraftArray( getState() );
            const availablePlayers = espnParserService.getAvailablePlayers( playerArray, leagueArray );
            const bestAvailablePlayer = _.minBy( availablePlayers, 'AverageDraftPosition' );
            dispatch( { type: types.SET_INITIAL_DRAFT_DATA,
                        availablePlayers: availablePlayers,
                        leagueArray: leagueArray,
                        draftArray: draftArray,
                        bestAvailablePlayer: bestAvailablePlayer
            } );
        } catch (error) {
            console.error(error);
        }
    };
}

export function selectPlayer(playerID) {
  return (dispatch, getState) => {
    const players = draftSelectors.getAvailablePlayers(getState());
    let newSelectedPlayer = _.find(players, function( plr ){ return plr.PlayerID === playerID } );
    dispatch({ type: types.PLAYER_SELECTED, selectedPlayer: newSelectedPlayer  });
  };
}
export function pickPlayer(playerID) {
  return (dispatch, getState) => {
    const players = draftSelectors.getAvailablePlayers(getState());
    let newSelectedPlayer = _.find(players, function( plr ){ return plr.PlayerID === playerID } );
    dispatch({ type: types.PLAYER_SELECTION_MADE, selectedPlayer: newSelectedPlayer  });
  };
}

export function finalizePlayerSelection() {
  return (dispatch, getState) => {
    const pickInfo = makePick();
    dispatch( { type: types.PLAYER_SELECTION_MADE } );
  };
}

export function clearPlayerSelection() {
    return (dispatch, getState) => {
        dispatch( { type: types.CLEAR_PLAYER_SELECTION  } );
    };
}

export function timerTick() {
    return (dispatch, getState) => {
        const isDraftInProgress = draftSelectors.isDraftInProgress(getState());
        const timeLeft = draftSelectors.getTimeLeft(getState());
        if(isDraftInProgress && timeLeft >= 1){
            dispatch( { type: types.TIMER_TICK, timeLeft: timeLeft - 1 } );
        }
    };
}

export function endDraft() {
    return (dispatch, getState) => {
        console.log("types.STOP_DRAFT");
    };
}

export function makePick( state ) {
    return (dispatch, getState) => {
        const availablePlayers = draftSelectors.getAvailablePlayersForView(getState());
        const selectedPlayer = draftSelectors.getSelectedPlayer(getState());
        const draftArray = draftSelectors.getDraftArrayForEdit(getState());
        const timeLeft = setupSelectors.getSecondsPerPick(getState());
        let currentPickInfo = draftSelectors.getCurrentPickInfo(getState());
        let currentPick = draftSelectors.getCurrentPick(getState());
        console.log(currentPick)
    };
    /*availablePlayers: action.availablePlayers,
            bestAvailablePlayer: action.bestAvailablePlayer,
            leagueArray: action.leagueArray,
            draftArray: action.draftArray,
            currentPick: action.currentPick,
            timeLeft: action.timeLeft*/

}