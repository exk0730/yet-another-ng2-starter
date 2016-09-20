# Yet Another Angular2 Starter


> Angular2 repository featuring [Angular 2](https://angular.io) ([Router](https://angular.io/docs/js/latest/api/router/), [Forms](https://angular.io/docs/js/latest/api/forms/), [Http](https://angular.io/docs/js/latest/api/http/), [Services](https://gist.github.com/gdi2290/634101fec1671ee12b3e#_follow_@AngularClass_on_twitter), [Tests](https://angular.io/docs/js/latest/api/test/), [E2E](https://angular.github.io/protractor/#/faq#what-s-the-difference-between-karma-and-protractor-when-do-i-use-which-)), 
[NGRX](https://egghead.io/lessons/angular-2-ngrx-store-in-10-minutes) ([Store](https://github.com/ngrx/store), [Effects](https://github.com/ngrx/effects)),
[Ng2-Translate](https://github.com/ocombe/ng2-translate),
[Lodash](https://lodash.com/),
[Karma](https://karma-runner.github.io/), 
[Protractor](https://angular.github.io/protractor/), 
[Jasmine](https://github.com/jasmine/jasmine), 
[Istanbul](https://github.com/gotwarlost/istanbul), 
[TypeScript](http://www.typescriptlang.org/), 
[@types](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/), 
[TsLint](http://palantir.github.io/tslint/), 
[Codelyzer](https://github.com/mgechev/codelyzer), 
[Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html), 
and [Webpack 2](http://webpack.github.io/) by [AngularClass](https://angularclass.com).

Based on [Angular 2 Webpack Starter](https://github.com/AngularClass/angular2-webpack-starter). Refer to that repo for 
commands and other 

### Quick start
**Make sure you have Node version >= 5.0 and NPM >= 3**

```bash
# clone our repo
# --depth 1 removes all but one .git commit history
git clone --depth 1 https://github.com/exk0730/yet-another-ng2-starter.git

# change directory to our repo
cd yet-another-ng2-starter

# install the repo with npm
npm install

# start the server
npm start

# use Hot Module Replacement
npm run server:dev:hmr
```

## Purpose
This repository serves as a base skeleton for projects that require Angular2, Webpack, TypeScript 2, Ng2-Translate, and NGRX. It also
allows advanced module pathing configuration.

#### NGRX
Although it is a steeper learning curve, the same pros of Redux apply. Here's a pretty good (and short) run-down of the
pros of using Redux for our application: http://stackoverflow.com/a/37543811/2262197. Be sure to check out the 
[ngrx example app](https://github.com/ngrx/example-app/tree/rc5).

#### Module Pathing
Instead of doing something like this:

```
import { X } from '../../../../folder-x';
```

this repository is set up to allow you to have import statements like so:
```
import { X } from 'x';
```

Currently, you can import things from the `shared` folder simply: `import { LanguageSwitcher } from 'shared';` In
order to add your own directories to allow easy imports, add an entry to `tsconfig.js` under the `paths` option. Then in
`config/webpack.common.js` and `config/webpack.test.js`, you have to add a property to the `alias` object in the `resolve`
option.

#### Ng2-Translate
To add more languages, make sure you have the supported JSON files in `src/assets/i18n`. Then you can just add the language
codes to `src/shared/config.ts` and these will be available in the language selector.

## Directory Structure
```
yaas/
 ├──config/                    * our configuration
 |   ├──helpers.js             * helper functions for our configuration files
 |   ├──spec-bundle.js         * ignore this magic that sets up our angular 2 testing environment
 |   ├──karma.conf.js          * karma config for our unit tests
 |   ├──protractor.conf.js     * protractor config for our end-to-end tests
 │   ├──webpack.dev.js         * our development webpack config
 │   ├──webpack.prod.js        * our production webpack config
 │   └──webpack.test.js        * our testing webpack config
 │
 ├──src/                       * our source files that will be compiled to javascript
 |   ├──main.browser.ts        * our entry file for our browser environment
 │   │
 |   ├──index.html             * Index.html: where we generate our index page
 │   │
 |   ├──polyfills.ts           * our polyfills file
 │   │
 |   ├──vendor.ts              * our vendor file
 │   │
 │   ├──app/                   * WebApp: folder
 │   │   └──core               * the core folder
 │   │       ├──N-entry        * any entry components for our app.
 │   │       ├──N-guard        * any guards for the entries to our app.
 │   │       ├──core.routes    * routes definition file
 │   │       └──core.module    * the module that imports all feature and shared modules. this is the module that should be bootstrapped
 │   │
 │   │   └──shared             * the shared folder. contains all components, services, etc that are shared between features
 │   │
 │   │   └──feature            * a feature folder. all pages within our app should have a feature folder. 
 │   │
 │   └──assets/                * static assets are served here
 │
 │
 ├──tslint.json                * typescript lint config
 ├──typedoc.json               * typescript documentation generator
 ├──tsconfig.json              * config that webpack uses for typescript
 ├──package.json               * what npm uses to manage it's dependencies
 └──webpack.config.js          * webpack main configuration file

```

### IDE Issues
If you're using WebStorm, I suggest setting your TypeScript compiler to a globally-installed TypeScript 2.0 version. For
example, my project has this as its TypeScript compiler path (.nvm is [NVM](https://github.com/creationix/nvm)):

```
/Users/user/.nvm/versions/node/v5.10.1/lib/node_modules/typescript/lib/
```
under `Webstorm -> Preferences -> Languages & Frameworks -> TypeScript`.