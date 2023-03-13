import RemoveFocusState from "remove-focus-state";
new RemoveFocusState();

require('./modules/test');
require('./modules/search-results');

const noJS = document.getElementsByClassName("no-js")[0];
noJS.classList.remove("no-js");
noJS.classList.add("js-loaded");
