import { ActionReducer } from '@ngrx/store';

import * as languageActions from './language.actions';

export interface ILanguageState {
    lang: string;
}

const initialState: ILanguageState = <ILanguageState>{
    lang: 'en'
};

export const languageReducer: ActionReducer<ILanguageState> =
    (state: ILanguageState = initialState, action: languageActions.Actions): ILanguageState => {
        switch (action.type) {
            case languageActions.ActionTypes.UPDATE: {
                return {
                    lang: action.payload
                };
            }

            default:
                return state;
        }
    };
