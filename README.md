# Rsbuild project

## Setup

Install the dependencies:

```bash
npm install
```

## Get started

Start the dev server, and the app will be available at [http://localhost:3000](http://localhost:3000).
http://localhost:3000/ru http://localhost:3000/?lng=ru

```bash
npm run dev
```

Build the app for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Learn more

To learn more about Rsbuild, check out the following resources:

- [Rsbuild documentation](https://rsbuild.rs) - explore Rsbuild features and APIs.
- [Rsbuild GitHub repository](https://github.com/web-infra-dev/rsbuild) - your feedback and contributions are welcome!

## Task

https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca
https://gitlab.com/frontendmentor4274851/country-api-switcher/pages#overview

## API

- https://restcountries.com
- Local JSON file with all countries

## Used technologies

- RsBuild (https://rsbuild.rs)
- Tanstack (manage/request API data instead fetch)
- Tanstack query devtools (invalidate/reload/trigger errors for getting API data)
- Redux toolkit (state management inside React)
- Redux dev tools (similar as Tanstack query devtools - but we invalidate here not API data but inner state of React application)
- React developer tools + React profiler (for performance)
- SCSS (start impl + BEM mixins)
- CSS Modules (try a bit/not implemented)
- Heroicons (https://heroicons.com/mini)
- BEM methodology for CSS

## Functional

- Change theme (dark, light)
- Search by country name
- Filter by region
- Open Country description
- Navigate to country description through country borders
- Supported languages: en, ru
- Offline work
- Keyboard navigation (tab-index - using Tab button to interact with page)

## Done

- Adding some animation and transition
- React.memo, useCallback/useMemo hooks for optimization
- Try redux middlewares
- Offline mode
- Try Inversify DI container:
  - Perfomance:
    - as soon as rsbuild have to process decorators (@inject, injectable)
    - performance down
    - Better do not use Inversify or do not use decorators at all
  - Circular deps:
    - has conflicts with slicers and middleware of Redux
    - not allow to get dependencies from container in them
  - Solution: removed
- internationalization (i18n)
  - i18next — core
  - react-i18next — integration with React
  - i18next-browser-languagedetector — auto lang detector by several conditions (see docs. Useful if add query like https://site.com?lng=ru)
  - i18next-http-backend — lazy load different translation files
  - Example: http://localhost:3000/ru http://localhost:3000/?lng=ru (default: en)
- CSS Modules (one of the realization CSS-IN-JS modules)
  - (Just try on one file - not implemented)
  - usage css classes in JS like object
  - naming of the files: \*.module.css|scss
  - use camelcase for classes like: '.containerContent' instead '.container-content' or appCssStyles['app__container-content']
  - Need to generate types for TS typification
    - https://github.com/Quramy/typed-css-modules
    - npm run types:css("types:css": "tcm -p \"src/\*_/_.module.{css,scss}\" --camelcase") - need run this command every time when css changed
      -Not implemented problems:
    - a) .app .header {} - such selector not working. After generation in html we get hashing classes: .app-tysRT .header {} - styles will never find
      - solution: separate global styles in global.css and use modules only for local files.
    - b) typed-css-modules - generate app.css.d.ts only near app.css file. Can not find way to get typization from separate folder
- SCSS + BEM
  - try on two top files only
- Accessibility (partially)

## TODO

- virtual scroll
- unit tests (RTK)
- service worker (- OfflineFlags)
- preload flags for offline work
