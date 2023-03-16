import RemoveFocusState from "remove-focus-state";
new RemoveFocusState();

import CheckForAnimations from "./modules/animate-when-visible";
new CheckForAnimations();

require('./modules/main-menu');
require('./modules/search-results');

const noJS = document.getElementsByClassName("no-js")[0];
noJS.classList.remove("no-js");
noJS.classList.add("js-loaded");
