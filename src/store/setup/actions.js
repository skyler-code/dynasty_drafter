import * as types from "./actionTypes";
import _ from "lodash";
import * as setupSelectors from "./reducer";
import * as importSelectors from "../leagueImport/reducer";

export function getInitialDraftOrder() {
  return (dispatch, getState) => {
    const leagueInfo = importSelectors.getParsedLeague(getState());
    const draftOrder = _.keys(leagueInfo.teamInfo);
    dispatch( { type: types.DRAFT_ORDER_CHANGED, draftOrder: draftOrder } );
  };
}