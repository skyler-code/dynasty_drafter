import Immutable from 'seamless-immutable';
import * as types from "./actionTypes";

const initialState = Immutable({
    finalLeagueArray: undefined,
    finalDraftArray: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
    case types.SET_RESULT_DATA:
        return state.merge({
            finalLeagueArray: action.finalLeagueArray,
            finalDraftArray: action.finalDraftArray
        });
    default:
        return state;
    }
}

export function getFinalLeagueArray(state) {
    return state.results.finalLeagueArray;
}

export function getFinalDraftArray(state) {
    return state.results.finalDraftArray;
}