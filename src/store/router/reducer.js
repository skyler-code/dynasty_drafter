import Immutable from 'seamless-immutable';
import * as types from "./actionTypes";

const initialState = Immutable({
    activeIndex: 0
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.CHANGE_INDEX:
            return state.merge({
                activeIndex: action.activeIndex
            });
    default:
        return state;
    }
}

export function getActiveIndex(state) {
    return state.router.activeIndex;
}