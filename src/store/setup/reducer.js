import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
    draftOrder: undefined,
    draftArray: undefined,
    numOfRounds: 6,
    secondsPerPick: 90,
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
    case types.DRAFT_ORDER_CHANGED:
        return state.merge({
            draftOrder: action.draftOrder
        });
    default:
        return state;
    }
}

export function getDraftOrder(state){
    return state.setup.draftOrder;
}