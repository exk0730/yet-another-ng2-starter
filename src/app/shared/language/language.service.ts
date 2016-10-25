import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate';
import * as _ from 'lodash';

import { ILang } from './language.interface';
import * as languageActions from './language.actions';
import { ILanguageState } from './language.reducer';
import { WindowService } from '../window';
import { IAppStore } from '../store';

@Injectable()
export class LanguageService {
    public static SUPPORTED_LANGUAGES: ILang[] = [
        {code: 'en', title: 'English'}
    ];

    constructor(private translateService: TranslateService, win: WindowService, private store: Store<IAppStore>) {
        this.translateService.setDefaultLang('en');

        let userLang = win.navigator.language.split('-')[0];

        this.store.select('language').subscribe((state: ILanguageState) => {
            if (this.translateService.getLangs() && this.translateService.getLangs().indexOf(state.lang) > -1) {
                this.translateService.use(state.lang);
            } else {
                this.translateService.reloadLang(state.lang).take(1).subscribe(() => {
                    setTimeout(() => this.translateService.use(state.lang), 0);
                });
            }
        });

        this.changeLang(userLang);
    }

    changeLang(lang: string) {
        if (_.includes(_.map(LanguageService.SUPPORTED_LANGUAGES, 'code'), lang)) {
            this.store.dispatch(new languageActions.UpdateAction(lang));
        }
    }
}
