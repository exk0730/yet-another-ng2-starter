import { ILang } from './language';

export class Config {
    public static SUPPORTED_LANGUAGES: ILang[] = [
        {code: 'en', title: 'English'},
        {code: 'es', title: 'Spanish'},
        {code: 'ko', title: 'Korean'}
    ];
}
