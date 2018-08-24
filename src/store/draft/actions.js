import _ from 'lodash';
import * as types from './actionTypes';
import * as draftSelectors from './reducer';
import * as setupSelectors from '../setup/reducer';
import * as importSelectors from '../leagueImport/reducer';
import espnParserService from "../../services/espn_parser";
import playerData from '../../data/player_data';
import teamData from '../../data/team_data';
import * as constants from '../../data/constants';

export function startDraft(){
    return (dispatch, getState) => {
        const secondsPerPick = draftSelectors.getTimeLeft( getState() ) || draftSelectors.getSecondsPerPick( getState() );
        dispatch( { type: types.DRAFT_STARTED, timeLeft: secondsPerPick } );
    };
}

export function setInitialDraftData(){
    return async(dispatch, getState) => {
        try {
            const isDefenseEnabled = setupSelectors.isDefenseEnabled( getState() );
            const playerArray = getFantasyPlayerData( isDefenseEnabled );
            const leagueArray = importSelectors.getParsedLeague( getState() ) || {};
            const draftArray = setupSelectors.getDraftArray( getState() );
            const availablePlayers = espnParserService.getAvailablePlayers( playerArray, leagueArray );
            const bestAvailablePlayer = _.minBy( availablePlayers, 'AverageDraftPosition' );
            const timeLeft = setupSelectors.getSecondsPerPick( getState() );
            dispatch( { type: types.SET_INITIAL_DRAFT_DATA,
                        availablePlayers: availablePlayers,
                        leagueArray: leagueArray,
                        draftArray: draftArray,
                        bestAvailablePlayer: bestAvailablePlayer,
                        timeLeft: timeLeft,
                        secondsPerPick: timeLeft,
                        isDefenseEnabled: isDefenseEnabled
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

export function finalizePlayerSelection() {
    return (dispatch, getState) => {
        const pickInfo = makePick(getState());
        dispatch( { type: types.PLAYER_SELECTION_MADE,
                    availablePlayers: pickInfo.availablePlayers,
                    bestAvailablePlayer: pickInfo.bestAvailablePlayer,
                    leagueArray: pickInfo.leagueArray,
                    draftArray: pickInfo.draftArray,
                    currentPick: pickInfo.currentPick,
                    timeLeft: pickInfo.timeLeft,
                    draftInProgress: pickInfo.draftInProgress } );
    };
}

export function undoPlayerSelection() {
    return (dispatch, getState) => {
        const pickInfo = undoLastPick(getState());
        dispatch( { type: types.UNDO_PLAYER_SELECTION,
                    availablePlayers: pickInfo.availablePlayers,
                    bestAvailablePlayer: pickInfo.bestAvailablePlayer,
                    draftArray: pickInfo.draftArray,
                    selectedPlayer: undefined,
                    currentPick: pickInfo.currentPick,
                    timeLeft: pickInfo.timeLeft } );
    };
}

export function clearPlayerSelection() {
    return (dispatch, getState) => {
        dispatch( { type: types.CLEAR_PLAYER_SELECTION } );
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
        dispatch( { type: types.STOP_DRAFT } )
    };
}

function makePick( state ) {
    const draftArray = draftSelectors.getDraftArrayForEdit(state);
    const selectedPlayer = draftSelectors.getSelectedOrBestPlayer(state);
    const timeLeft = draftSelectors.getSecondsPerPick(state);
    const availablePlayers = _.filter( draftSelectors.getAvailablePlayersForView(state), function(p){ return p.hashKey !== selectedPlayer.hashKey; } );
    let currentPickInfo = draftSelectors.getCurrentPickInfo(state);
    let currentPick = draftSelectors.getCurrentPick(state);
    let draftInProgress = true;
    const bestAvailablePlayer = _.minBy( availablePlayers, 'AverageDraftPosition' );
    currentPickInfo.Player_Picked = selectedPlayer;
    draftArray[currentPick] = currentPickInfo;

    if(currentPick < draftArray.length - 1)
        currentPick = currentPick + 1;
    else
        draftInProgress = false;

    return {
        availablePlayers: availablePlayers,
        bestAvailablePlayer: bestAvailablePlayer,
        draftArray: draftArray,
        currentPick: currentPick,
        timeLeft: timeLeft,
        draftInProgress: draftInProgress
    }
}

function undoLastPick( state ) {
    const draftArray = draftSelectors.getDraftArrayForEdit(state);
    const pickToUndo = draftSelectors.getCurrentPick(state) - 1;
    let lastPick = draftArray[pickToUndo];
    const lastPickedPlayer = draftArray[pickToUndo].Player_Picked;
    const timeLeft = draftSelectors.getSecondsPerPick( state );
    const availablePlayers = draftSelectors.getAvailablePlayersForView( state );
    availablePlayers.push(lastPickedPlayer);
    const bestAvailablePlayer = _.minBy( availablePlayers, 'AverageDraftPosition' );

    lastPick.Player_Picked = undefined;
    draftArray[pickToUndo] = lastPick;

    return {
        availablePlayers: availablePlayers,
        bestAvailablePlayer: bestAvailablePlayer,
        draftArray: draftArray,
        currentPick: pickToUndo,
        timeLeft: timeLeft
    }
}

export function resetState(){
    return (dispatch, getState) => {
        dispatch( { type: types.RESET_STATE } );
    };
}

function getFantasyPlayerData( defenseEnabled ) {
    let stripPlayerObject = ( plr ) => {
        let getFullTeamName = ( teamName ) => {
            return _.find( teamData, function( team ){
                return team.Team === teamName;
            } ).FullTeamName;
        };
        return {
            PlayerID: plr.PlayerID,
            Team: plr.Team,
            FullTeamName: getFullTeamName(plr.Team),
            Number: plr.Number,
            FirstName: plr.FirstName || "",
            LastName: plr.LastName || "",
            Name: plr.Name,
            Position: plr.Position,
            FantasyPosition: plr.FantasyPosition,
            PhotoUrl: plr.PhotoUrl,
            AverageDraftPosition: plr.AverageDraftPosition,
            DynastyRanking: plr.DynastyRanking,
            Status: plr.Status,
            Age: plr.Age,
            College: plr.College,
            Experience: plr.Experience,
            ExperienceString: plr.ExperienceString,
            hashKey: plr.hashKey || constants.hashPlayerInfo( plr )
        }
    };
    let returnData = _.map( playerData, stripPlayerObject );
    if( defenseEnabled )
        returnData = _.concat( returnData, teamData );
    return returnData;
}