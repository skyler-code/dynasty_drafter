import * as types from "./actionTypes";
import _ from "lodash";
import * as setupSelectors from "./reducer";
import * as importSelectors from "../leagueImport/reducer";

export function getInitialDraftInfo() {
    return (dispatch, getState) => {
        const leagueInfo = importSelectors.getParsedLeague(getState());
        const numberOfRounds = setupSelectors.getNumOfRounds(getState());
        const draftOrder = ( leagueInfo || {} ).teamInfo;
        let draftArray = [];
        function addToDraftArray(team){
            draftArray.push( {
                Original_Owner: {teamName: team.teamName, hashKey: team.hashKey},
                Traded_To: undefined
            } );
        }
        for( let i=0; i<numberOfRounds; i++){
            _.forEach(draftOrder, addToDraftArray );
        }
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
        console.log(draftArray[index]);
        dispatch( { type: types.DRAFT_ARRAY_CHANGED, draftArray: draftArray } );
    };
}

/*
export function updateDraftArray(){
  return (dispatch, getState) => {
    const currentDraftArray = setupSelectors.getDraftArray( getState() );
    dispatch( { type: types.DRAFT_ARRAY_CHANGED, draftArray: draftOrder } );
  };
}*/
