import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

const CATEGORY = '[Language]';

@Injectable()
export class LanguageActions {
    static UPDATE = `${CATEGORY} Updated`;
    static update(lang: string): Action {
        return {
            type: LanguageActions.UPDATE,
            payload: lang
        };
    }
}
