import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core';

import { ILanguageState, languageReducer } from './language';

const stateSetter = (reducer: ActionReducer<any>): ActionReducer<any> => {
    return (state: any, action: Action) => {
        if (action.type === 'SET_ROOT_STATE') {
            return action.payload;
        }
        return reducer(state, action);
    };
};

export interface IAppStore {
    language: ILanguageState;
}

let reducers;
if (ENV === 'test') {
    reducers = {
        language: languageReducer
    };
} else {
    reducers = compose(stateSetter, combineReducers)({
        language: languageReducer
    });
}
export const NGRX_REDUCERS = reducers;
