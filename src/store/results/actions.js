import * as draftSelectors from "../draft/reducer";
import * as importSelectors from '../leagueImport/reducer';
import * as setupSelectors from '../setup/reducer';
import * as types from "./actionTypes";
import _ from "lodash";

export function setResultDraftData(){
    return (dispatch, getState) => {
        let finalLeagueArray = _.cloneDeep( importSelectors.getParsedLeague( getState() ) );
        finalLeagueArray.teamInfo = setupSelectors.getDraftOrderForView( getState() ).draftOrder;
        const finalDraftArray = draftSelectors.getDraftArrayForEdit( getState() );
        const selectedTeam = _.first( finalLeagueArray.teamInfo ).hashKey;
        dispatch( { type: types.SET_RESULT_DATA,
                    finalLeagueArray: finalLeagueArray,
                    finalDraftArray: finalDraftArray,
                    selectedTeam: selectedTeam
        } );
    };
}

export function setSelectedTeam(hashKey){
    return (dispatch, getState) => {
        dispatch( { type: types.SET_SELECTED_TEAM,
                    selectedTeam: hashKey
        } );
    };
}