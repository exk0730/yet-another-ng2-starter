import { platformBrowser } from '@angular/platform-browser';
import { disableDebugTools } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { bootloader } from '@angularclass/hmr';

import { CoreModule } from './app/core';

disableDebugTools();
enableProdMode();

export function main(): Promise<any> {
  return platformBrowser()
    .bootstrapModule(CoreModule)
    .catch(err => console.error(err));
}

bootloader(main);
