// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

import * as types from './actionTypes';
import espnParserService from '../../services/espn_parser';
import * as importSelectors from "./reducer";

export function processUserInput( input ){
  return (dispatch, getState) => {
    const parsedLeague = espnParserService.parseInput( input );
    dispatch({ type: types.LEAGUE_IMPORTED, parsedLeague: parsedLeague  });
  };
}