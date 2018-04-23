import * as types from "./actionTypes";
import _ from "lodash";
import * as setupSelectors from "./reducer";
import * as importSelectors from "../leagueImport/reducer";

export function getInitialDraftInfo() {
    return (dispatch, getState) => {
        const leagueInfo = importSelectors.getParsedLeague(getState());
        const numberOfRounds = setupSelectors.getNumOfRounds(getState());
        const draftOrder = _.keys(leagueInfo.teamInfo);
        let draftArray = [];
        for( let i=0; i<numberOfRounds; i++){
            _.forEach(draftOrder, addToDraftArray );
        }
        function addToDraftArray(team){
            draftArray.push( {
                Original_Owner: team,
                Current_Owner: team
            } );
        }
        if(!draftArray.length)
            draftArray = undefined;
    dispatch( { type: types.FETCH_INITIAL_DRAFT_SETUP, draftOrder: draftOrder, draftArray: draftArray } );
    };
}

/*
export function updateDraftArray(){
  return (dispatch, getState) => {
    const currentDraftArray = setupSelectors.getDraftArray( getState() );
    dispatch( { type: types.DRAFT_ARRAY_CHANGED, draftArray: draftOrder } );
  };
}*/
