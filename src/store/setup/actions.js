import * as types from "./actionTypes";
import _ from "lodash";
import * as setupSelectors from "./reducer";
import * as importSelectors from "../leagueImport/reducer";

export function getInitialDraftInfo() {
    return (dispatch, getState) => {
        const leagueInfo = importSelectors.getParsedLeague(getState());
        const draftOrder = _.toArray( (  leagueInfo || {} ).teamInfo );
        dispatch( { type: types.DRAFT_ORDER_CHANGED, draftOrder: draftOrder } );
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
        value = value >= 4 && value <= 8 ? value : numOfRounds;
        dispatch( { type: types.NUM_OF_ROUNDS_UPDATED, numOfRounds: value } );
    };
}

export function updateSecondsPerPick( value ){
    return (dispatch, getState) => {
        value = value >= 1 ? value : setupSelectors.getSecondsPerPick(getState());
        dispatch( { type: types.SECONDS_PER_PICK_UPDATED, secondsPerPick: value } );
    };
}

export function createDraftArray(){
    return (dispatch, getState) => {
        let draftArray = [];
        let numberOfRounds = setupSelectors.getNumOfRounds(getState());
        let draftOrder = setupSelectors.getDraftOrder(getState());
        function addToDraftArray(team){
            draftArray.push( {
                Original_Owner: {teamName: team.teamName, hashKey: team.hashKey},
                Traded_To: undefined
            } );
        }
        for(let i=0; i<numberOfRounds; i++){
            _.forEach(draftOrder.draftOrder, addToDraftArray );
        }
        dispatch( { type: types.DRAFT_ARRAY_CHANGED, draftArray: draftArray } );
    };
}

export function unloadDraftArray(){
    return (dispatch, getState) => {
        dispatch( { type: types.DRAFT_ARRAY_CHANGED, draftArray: undefined } );
    };
}
