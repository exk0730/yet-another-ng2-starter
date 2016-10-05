import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './env';
import { bootloader } from '@angularclass/hmr';

import { CoreModule } from './app/core';

export function main(): Promise<any> {
    return platformBrowserDynamic()
        .bootstrapModule(CoreModule)
        .then(decorateModuleRef)
        .catch(err => console.error(err));
}

bootloader(main);
