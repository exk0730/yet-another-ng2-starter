import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-entry',
    template: `
        <language-switcher></language-switcher>
        <div>
            {{'HELLO_WORLD' | translate}}
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class AppEntry {}
