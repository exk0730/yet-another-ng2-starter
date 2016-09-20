import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { ILang } from './language.interface';
import { ILanguageState } from './language.reducer';
import { LanguageService } from './language.service';
import { IAppStore } from '../store';

@Component({
    selector: 'language-switcher',
    template: require('./language-switcher.html')
})
export class LanguageSwitcher {
    public lang: string;
    public supportedLanguages: ILang[] = LanguageService.SUPPORTED_LANGUAGES;

    constructor(store: Store<IAppStore>, private languageService: LanguageService) {
        let model$: Observable<ILanguageState> = <Observable<ILanguageState>>store.select('language').share();

        model$.map(data => data.lang).subscribe(lang => this.lang = lang);
    }

    changeLang(e: any) {
        let lang = this.supportedLanguages[0].code;

        if (e && e.target) {
            lang = e.target.value;
        }

        this.languageService.changeLang(lang);
    }
}
