import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { getStore } from '../../testing';
import { LanguageSwitcher } from './language-switcher.component';
import { ILanguageState, languageReducer } from './language.reducer';
import { LanguageActions } from './language.actions';
import { LanguageService } from './language.service';
import { Config } from '../config';
import { SharedModule } from '../shared.module';
LanguageService.SUPPORTED_LANGUAGES = Config.SUPPORTED_LANGUAGES;

describe('LoginComponent', () => {
    const spy = jasmine.createSpy('language').and.callFake(function (state, action) {
        return languageReducer(state, action);
    });
    let componentInstance: LanguageSwitcher;
    let fixture;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                SharedModule,
                getStore({language: spy})
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        TestBed.compileComponents();

        fixture = TestBed.createComponent(LanguageSwitcher);
        fixture.detectChanges();
        componentInstance = (<LanguageSwitcher>fixture.componentInstance);
    });

    it('should have X options where X is a user-configured amount of language codes', () => {
        let options = fixture.debugElement.nativeElement.querySelectorAll('option');
        expect(options.length).toBe(Config.SUPPORTED_LANGUAGES.length);
    });

    it('should emit a language action when the user selects a new language', () => {
        let fakeEvent = {
            target: {
                value: 'es'
            }
        };
        componentInstance.changeLang(fakeEvent);

        let initialState: ILanguageState = {
            lang: 'en'
        };
        expect(spy.calls.mostRecent().args).toEqual([initialState, LanguageActions.update('es')]);
    });
});
