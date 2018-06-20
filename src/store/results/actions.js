import * as draftSelectors from "../draft/reducer";
import * as types from "./actionTypes";
import _first from "lodash/first";

export function setResultDraftData(){
    return (dispatch, getState) => {
        const finalLeagueArray = draftSelectors.getLeagueArrayForEdit( getState() );
        const finalDraftArray = draftSelectors.getDraftArrayForEdit( getState() );
        const selectedTeam = _first( finalLeagueArray.teamInfo ).hashKey;
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