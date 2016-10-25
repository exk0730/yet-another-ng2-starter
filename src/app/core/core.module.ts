import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { createNewHosts, createInputTransfer, removeNgStyles } from '@angularclass/hmr';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { Core } from './core.component';
import { routes } from './core.routes';
import { AppEntry } from './app-entry.component';
import { NGRX_REDUCERS, SharedModule } from 'shared';

let imports = [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
    StoreModule.provideStore(NGRX_REDUCERS),
    RouterStoreModule.connectRouter(),
    SharedModule
];

if (ENV === 'development') {
    imports.push(
        StoreDevtoolsModule.instrumentStore({ monitor: useLogMonitor() }),
        StoreLogMonitorModule
    );
}

@NgModule({
    bootstrap: [Core],
    declarations: [Core, AppEntry],
    imports: imports
})
export class CoreModule {
    constructor(private appRef: ApplicationRef, private store: Store<any>) {}

    hmrOnInit(store) {
        if (!store || !store.rootState) {
            return;
        }

        if (store.rootState) {
            this.store.dispatch({
                type: 'SET_ROOT_STATE',
                payload: store.rootState
            });
        }

        if ('restoreInputValues' in store) {
            store.restoreInputValues();
        }

        this.appRef.tick();
        Object.keys(store).forEach(prop => delete store[prop]);
    }

    hmrOnDestroy(store) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        this.store.take(1).subscribe(s => store.rootState = s);
        store.disposeOldHosts = createNewHosts(cmpLocation);
        store.restoreInputValues  = createInputTransfer();
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
