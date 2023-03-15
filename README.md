# Styles and scripts setup

## Requirements
- node
- npm
- yarn (optional)

## Setup
- run `npm install` or `yarn install`
- run `npm run build` or `yarn build` to build
- run `npm run watch` or `yarn watch` to build and start watching for changes
- run `npm run start` or `yarn start` to run project on `http://127.0.0.1:8000`

## VS code extensions (optional)
Code spell checker
CSS peek
ESLint
IntelliSense for CSS class names in HTML
Name that color
Prettier
SCSS IntelliSense

## NOTES
- Issue requesting data from API using localhost so using a proxy server and caching results (`https://allorigins.win/`)
- Using `Figtree` font as this is a close replacement for Proxima Nova (adobe font)
- Added medium font where needed but this is not visible with the replacement font. Could download more fonts or use correct font in the future
- Desktop sub-menu is using a JS click event to open/close to avoid "tunnelling" from hover states - https://www.smashingmagazine.com/2021/05/frustrating-design-patterns-mega-dropdown-hover-menus/
- Using Font Awesome for icons, would use icomoon or similar with the actual icons in production

## TIME RESTRAINTS
- Would have made the header sticky
- Due to time constraints there is no tablet view. At 1024px it jumps to mobile (375px). Given more time Id have made it fully responsive
- media queries have been written inline whereas Id normally put these in the own files and subfolder