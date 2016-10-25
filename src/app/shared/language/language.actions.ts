import { Action } from '@ngrx/store';

export const ActionTypes = {
    UPDATE: <'[Language] Update'>('[Language] Update')
};

export class UpdateAction implements Action {
    type = ActionTypes.UPDATE;

    constructor(public payload: string) {}
}

export type Actions = UpdateAction;
