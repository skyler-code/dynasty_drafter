//import * as routerSelectors from "./reducer";
import * as types from "./actionTypes";

export function setActiveIndex(index){
    return (dispatch, getState) => {
        dispatch( { type: types.CHANGE_INDEX,
                    activeIndex: index
        } );
    };
}

export function startDraft(){
    return (dispatch, getState) => {
        dispatch( { type: types.CHANGE_INDEX,
                    activeIndex: 0
        } );
    };
}

export function endDraft(){
    return (dispatch, getState) => {
        dispatch( { type: types.CHANGE_INDEX,
                    activeIndex: 2
        } );
    };
}

export function showResults(){
    return (dispatch, getState) => {
        dispatch( { type: types.CHANGE_INDEX,
                    activeIndex: 3
        } );
    };
}