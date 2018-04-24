import * as types from "./actionTypes";
import _ from "lodash";
import * as setupSelectors from "./reducer";
import * as importSelectors from "../leagueImport/reducer";

export function getInitialDraftInfo() {
    return (dispatch, getState) => {
        const leagueInfo = importSelectors.getParsedLeague(getState());
        const numberOfRounds = setupSelectors.getNumOfRounds(getState());
        const draftOrder = _.toArray( (  leagueInfo || {} ).teamInfo );
        const draftArray = createDraftArray( draftOrder, numberOfRounds );
        dispatch( { type: types.FETCH_INITIAL_DRAFT_SETUP, draftOrder: draftOrder, draftArray: draftArray } );
    };
}

export function makeDraftTrade( index, tradedTo ){
    return (dispatch, getState) => {
        let draftArray = _.clone(setupSelectors.getDraftArray(getState()));
        const draftOrder = setupSelectors.getDraftOrder(getState());
        let pick = _.clone(draftArray[index]);
        pick.Traded_To = _.find( draftOrder.teamNames, function( team ){ return team.hashKey === Number( tradedTo ); } );
        draftArray[index] = pick;
        dispatch( { type: types.DRAFT_ARRAY_CHANGED, draftArray: draftArray } );
    };
}

export function updateNumberOfRounds( value ){
    return (dispatch, getState) => {
        const numOfRounds = setupSelectors.getNumOfRounds(getState());
        const draftOrder = setupSelectors.getDraftOrder(getState());
        let draftArray = _.clone(setupSelectors.getDraftArray(getState()));
        let numOfTeams = setupSelectors.getNumberOfTeams(getState());
        value = value >= 4 && value <= 8 ? value : numOfRounds;
        if(numOfRounds > value)
            draftArray = _.dropRight(draftArray, numOfTeams * ( numOfRounds - value ) );
        else if ( numOfRounds < value )
            draftArray = createDraftArray(draftOrder.draftOrder, value, draftArray, numOfRounds);
        dispatch( { type: types.NUM_OF_ROUNDS_UPDATED, numOfRounds: value, draftArray: draftArray } );
    };
}

export function updateSecondsPerPick( value ){
    return (dispatch, getState) => {
        value = value >= 1 ? value : setupSelectors.getSecondsPerPick(getState());
        dispatch( { type: types.SECONDS_PER_PICK_UPDATED, secondsPerPick: value } );
    };
}

function createDraftArray(draftOrder, numberOfRounds, oldDraftArray, oldNumberOfRounds){
    let draftArray = oldDraftArray || [];
    let startRound = oldNumberOfRounds || 0;
    function addToDraftArray(team){
        draftArray.push( {
            Original_Owner: {teamName: team.teamName, hashKey: team.hashKey},
            Traded_To: undefined
        } );
    }
    for(; startRound<numberOfRounds; startRound++){
        _.forEach(draftOrder, addToDraftArray );
    }
    return draftArray;
}

/*
export function updateDraftArray(){
  return (dispatch, getState) => {
    const currentDraftArray = setupSelectors.getDraftArray( getState() );
    dispatch( { type: types.DRAFT_ARRAY_CHANGED, draftArray: draftOrder } );
  };
}*/
