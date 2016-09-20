import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http } from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { WindowService } from './window';
import { LanguageSwitcher, LanguageService } from './language';
import { Config } from './config';
LanguageService.SUPPORTED_LANGUAGES = Config.SUPPORTED_LANGUAGES;

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            deps: [Http],
            useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json')
        })
    ],
    declarations: [LanguageSwitcher],
    exports: [LanguageSwitcher, TranslateModule],
    providers: [
        Config,
        LanguageService,
        {provide: WindowService, useValue: window}
    ]
})
export class SharedModule {}
