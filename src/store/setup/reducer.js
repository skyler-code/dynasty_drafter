import Immutable from 'seamless-immutable';
import * as types from './actionTypes';
import _ from 'lodash';

const initialState = Immutable({
    draftOrder: undefined,
    draftArray: undefined,
    numOfRounds: 4,
    secondsPerPick: 90,
    snakeDraft: false,
    defenseEnabled: true,
    finalDraftArray: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.DRAFT_ORDER_CHANGED:
            return state.merge({
                draftOrder: action.draftOrder
            });
        case types.DRAFT_TYPE_CHANGED:
            return state.merge({
                snakeDraft: action.snakeDraft
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
        case types.DEFENSE_UPDATED:
            return state.merge({
                defenseEnabled: action.defenseEnabled
            });
        case types.SAVE_FINAL_DRAFT_ORDER:
            return state.merge({
                finalDraftArray: action.finalDraftArray
            });
        default:
            return state;
    }
}

export function getDraftOrderForView(state){
    const draftOrder = _.cloneDeep((state.setup || {}).draftOrder);
    const teamNames = _.map(draftOrder, function( team ) { return { teamName: team.teamName, hashKey: team.hashKey } } );
    return { draftOrder: draftOrder, teamNames: teamNames };
}

export function getDraftArray(state){
    return state.setup.draftArray;
}

export function getFinalDraftArray(state){
    return state.setup.finalDraftArray;
}

export function draftArrayExists(state){
    return !!state.setup.draftArray || !!state.setup.finalDraftArray;
}

export function getDraftArrayForView(state){
    return _.map(state.setup.draftArray, function( pick ){
        let tradedTo = pick.Traded_To || {};
        return {
            Original_Owner_Name: pick.Original_Owner.teamName,
            Original_Owner_Hash_Key: pick.Original_Owner.hashKey,
            Traded_To_Name: tradedTo.teamName,
            Traded_To_Hash_Key: tradedTo.hashKey
        };
    } );
}

export function getNumOfRounds(state){
    return state.setup.numOfRounds;
}

export function getSecondsPerPick(state){
    return state.setup.secondsPerPick;
}

export function getNumberOfTeams(state){
    return ( state.leagueImport.parsedLeague || {} ).teamCount;
}

export function isSnakeDraftEnabled(state){
    return state.setup.snakeDraft;
}

export function isDefenseEnabled(state){
    return state.setup.defenseEnabled;
}