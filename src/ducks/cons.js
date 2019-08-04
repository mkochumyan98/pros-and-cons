import { Record } from 'immutable';
import { createSelector } from 'reselect';
import uuid from 'uuid';

export const moduleName = 'cons';

// Initial State
const ReducerRecord = Record({
    consList: [],
    consCount: 0,
});


// Action Types
export const ADD_CONS = 'ADD_CONS';
export const SET_CONS_LIST = 'SET_CONS_LIST';
export const UPDATE_CONS = 'UPDATE_CONS';
export const DELETE_CONS = 'DELETE_CONS';


// Action Creators
export function addCons(payload) {
    return ({
        type: ADD_CONS,
        payload
    });
}

export function setCons(payload) {
    return ({
        type: SET_CONS_LIST,
        payload
    });
}

export function updateCons(payload) {
    return ({
        type: UPDATE_CONS,
        payload
    });
}

export function deleteCons(payload) {
    return ({
        type: DELETE_CONS,
        payload
    });
}


// Reducers
export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_CONS:
            return state
                .set('consList', [...state.consList, { value: payload, id: uuid() }])
                .set('consCount', state.consCount + 1);

        case SET_CONS_LIST:
            return state
                .set('consList', payload)
                .set('consCount', payload.length);

        case UPDATE_CONS:
            return state
                .set('consList', state.consList.map(cons => cons.id === payload.id ? { value: payload.value, id: cons.id } : cons));

        case DELETE_CONS:
            return state
                .set('consList', state.consList.filter(cons => cons.id !== payload.id ? cons : false))
                .set('consCount', state.consCount - 1);

        default:
            return state;
    }
}


// Selectors
const stateSelector = state => state[moduleName];

export const consListSelector = createSelector(stateSelector, state => state.consList);
export const consCountSelector = createSelector(stateSelector, state => state.consCount);