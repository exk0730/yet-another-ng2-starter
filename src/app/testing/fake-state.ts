import { StoreModule } from '@ngrx/store';

import { IAppStore, NGRX_REDUCERS } from 'shared';

const INITIAL_STATE: IAppStore = {
    language: {
        lang: 'en'
    }
};

/**
 * This is a helper function for testing components that interact with an ngrx `Store`. We set up the initial state of
 * our store with all of the reducers. Since we are doing unit tests, the reducer-under-test should actually be a spy
 * which we create in our spec file.
 *
 * @param spy A key-value pair where key is the reducer we are replacing in the store, and the value is a call to
 *            `jasmine.createSpy...and.callFake`.
 *
 * @returns {ModuleWithProviders}
 */
export const getStore = (spy: {[key: string]: any}) => {
    return StoreModule.provideStore(Object.assign(NGRX_REDUCERS, spy), INITIAL_STATE);
};
