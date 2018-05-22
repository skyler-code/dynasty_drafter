import * as draftSelectors from "../draft/reducer";
import * as types from "./actionTypes";
import _ from "lodash";

export function setResultDraftData(){
    return (dispatch, getState) => {
        const finalLeagueArray = draftSelectors.getLeagueArrayForEdit( getState() );
        const finalDraftArray = draftSelectors.getDraftArrayForEdit( getState() );
        dispatch( { type: types.SET_RESULT_DATA,
                    finalLeagueArray: finalLeagueArray,
                    finalDraftArray: finalDraftArray
        } );
    };
}