import * as types from './actionTypes';
import espnParserService from '../../services/espn_parser';

export function processUserInput( input ){
    return (dispatch, getState) => {
        const parsedLeague = input.length > 50 ? espnParserService.parseInput( input ) : {};
        dispatch({ type: types.LEAGUE_IMPORTED, parsedLeague: parsedLeague, leagueInput: input  });
    };
}

export function resetState(){
    return (dispatch, getState) => {
        dispatch( { type: types.RESET_STATE } );
    };
}