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

**NOTE** `install/build/watch` are not required for simply viewing the site. Use `start` to see the project running on `http://127.0.0.1:8000` or open `index.html` in chrome/edge etc

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
- Added medium font where needed but this is not visible with the replacement font. Could download more font weights or use correct font in the future
- Desktop sub-menu is using a JS click event to open/close to avoid "tunnelling" from hover states - https://www.smashingmagazine.com/2021/05/frustrating-design-patterns-mega-dropdown-hover-menus/
- Desktop sub-menu only works on "treatments" menu item. Could be expanded to work with other menu items
- Using Font Awesome for icons, would use icomoon or similar with the actual icons in production
- Added custom javascript animation function. Checks to see if an element is within the viewport or already been scrolled past (to avoid animations when scrolling up as this can look strange). Only using fadeIn variants but could work for others

## TIME RESTRAINTS
- Would have made the header sticky
- Due to time constraints there is no tablet view. At `1024px` it jumps to mobile (`375px`). Given more time Id have made it fully responsive
- Media queries have been written inline whereas Id normally put these in the own files and subfolder
- Footer is missing
- "View more" functionality on results has been omitted due to time constraints. Also looking at the content provided this might not be required