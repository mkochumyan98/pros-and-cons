import { Record } from 'immutable';
import { createSelector } from 'reselect';
import uuid from 'uuid';

export const moduleName = 'pros';

// Initial State
const ReducerRecord = Record({
    prosList: [],
    prosCount: 0,
});


// Action Types
export const ADD_PROS = 'ADD_PROS';
export const SET_PROS_LIST = 'SET_PROS_LIST';
export const UPDATE_PROS = 'UPDATE_PROS';
export const DELETE_PROS = 'DELETE_PROS';


// Action Creators
export function addPros(payload) {
    return ({
        type: ADD_PROS,
        payload
    });
}

export function setPros(payload) {
    return ({
        type: SET_PROS_LIST,
        payload
    });
}

export function updatePros(payload) {
    return ({
        type: UPDATE_PROS,
        payload
    });
}

export function deletePros(payload) {
    return ({
        type: DELETE_PROS,
        payload
    });
}


// Reducers
export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_PROS:
            return state
                .set('prosList', [...state.prosList, { value: payload, id: uuid() }])
                .set('prosCount', state.prosCount + 1);

        case SET_PROS_LIST:
            return state
                .set('prosList', payload)
                .set('prosCount', payload.length);

        case UPDATE_PROS:
            return state
                .set('prosList', state.prosList.map(pros => pros.id === payload.id ? { value: payload.value, id: pros.id } : pros));

        case DELETE_PROS:
            return state
                .set('prosList', state.prosList.filter(pros => pros.id !== payload.id ? pros : false))
                .set('prosCount', state.prosCount - 1);

        default:
            return state;
    }
}


// Selectors
const stateSelector = state => state[moduleName];

export const prosListSelector = createSelector(stateSelector, state => state.prosList);
export const prosCountSelector = createSelector(stateSelector, state => state.prosCount);