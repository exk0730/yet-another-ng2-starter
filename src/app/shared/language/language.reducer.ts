import { Action, ActionReducer } from '@ngrx/store';

import { LanguageActions } from './language.actions';

export interface ILanguageState {
    lang: string;
}

const initialState: ILanguageState = {
    lang: 'en'
};

export const languageReducer: ActionReducer<ILanguageState> =
    (state: ILanguageState = initialState, action: Action): ILanguageState => {
        switch (action.type) {
            case LanguageActions.UPDATE:
                return {
                    lang: action.payload
                };

            default:
                return state;
        }
    };
