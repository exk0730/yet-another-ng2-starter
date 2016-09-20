import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

const PROD_CONFIG = {
    selector: 'core',
    template: `<router-outlet></router-outlet>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default
};

const DEV_CONFIG = Object.assign({}, PROD_CONFIG, {
    template: `<router-outlet></router-outlet><ngrx-store-log-monitor toggleCommand="ctrl-t"></ngrx-store-log-monitor>`
});

@Component(ENV === 'development' ? DEV_CONFIG : PROD_CONFIG)
export class Core {
    constructor() {
        console.log(`Running: ${ENV}`);
    }
}
