import Immutable from 'seamless-immutable';
import * as types from './actionTypes';
import _ from 'lodash';
import sha256 from 'crypto-js/sha256';

const initialState = Immutable({
    draftOrder: undefined,
    draftArray: undefined,
    numOfRounds: 4,
    secondsPerPick: 90,
    snakeDraft: false,
    defenseEnabled: true,
    settingsChanged: false,
    password: "",
    salt: ""
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.DRAFT_ORDER_CHANGED:
            return state.merge({
                draftOrder: action.draftOrder,
                settingsChanged: true
            });
        case types.DRAFT_TYPE_CHANGED:
            return state.merge({
                snakeDraft: action.snakeDraft,
                settingsChanged: true
            });
        case types.DRAFT_ARRAY_CHANGED:
            return state.merge({
                draftArray: action.draftArray,
                settingsChanged: true
            });
        case types.NUM_OF_ROUNDS_UPDATED:
            return state.merge({
                numOfRounds: action.numOfRounds,
                settingsChanged: true
            });
        case types.SECONDS_PER_PICK_UPDATED:
            return state.merge({
                secondsPerPick: action.secondsPerPick,
                settingsChanged: true
            });
        case types.DEFENSE_UPDATED:
            return state.merge({
                defenseEnabled: action.defenseEnabled,
                settingsChanged: true
            });
        case types.TOGGLE_SETTINGS_CHANGED:
            return state.merge({
                settingsChanged: false
            });
        case types.PASSWORD_UPDATED:
            return state.merge({
                password: action.password,
                salt: action.salt
            });
        case types.RESET_STATE:
            return initialState;
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

export function draftArrayExists(state){
    return !!state.setup.draftArray;
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

export function haveSettingsChanged(state){
    return state.setup.settingsChanged;
}

export function isPasswordSet(state){
    return !!state.setup.password;
}

export function checkPassword(state){
    return function( input ){ return state.setup.password === sha256( input, state.setup.salt ).toString() };
}

export function getSalt(state){
    return state.setup.salt;
}