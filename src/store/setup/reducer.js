import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
    draftOrder: undefined,
    draftArray: undefined,
    numOfRounds: 6,
    secondsPerPick: 90
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_INITIAL_DRAFT_SETUP:
            return state.merge({
                draftOrder: action.draftOrder,
                draftArray: action.draftArray
            });
        case types.DRAFT_ORDER_CHANGED:
            return state.merge({
                draftOrder: action.draftOrder
            });
        case types.DRAFT_ARRAY_CHANGED:
            return state.merge({
                draftArray: action.draftArray
            });
        case types.NUM_OF_ROUNDS_UPDATED:
            return state.merge({
                numOfRounds: action.numOfRounds
            });
        case types.SECONDS_PER_PICK_UPDATED:
            return state.merge({
                secondsPerPick: action.secondsPerPick
            });
        default:
            return state;
    }
}

export function getDraftOrder(state){
    return state.setup.draftOrder;
}

export function getDraftArray(state){
    return state.setup.draftArray;
}

export function getNumOfRounds(state){
    return state.setup.numOfRounds;
}

export function getSecondsPerPick(state){
    return state.setup.secondsPerPick;
}