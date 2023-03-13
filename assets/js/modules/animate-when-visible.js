window.addEventListener("load", () => {
    checkForAnimations();
});

window.addEventListener("scroll", () => {
    checkForAnimations();
});

function checkForAnimations() {
    document.querySelectorAll('[data-behaviour="animate-when-visible"]:not(.animate)').forEach((item) => {
        console.log(item.dataset);
        // Default offset is 20px
        const offset = item.dataset.animationOffSet ? item.dataset.animationOffSet : 20;
        const animationDelay = item.dataset.animationDelay ? item.dataset.animationDelay : 0;
        const isOnScreen = isElementInViewport(item, offset)

        if (animationDelay) {
            item.style.animationDelay = animationDelay;
        }
        
        if(isOnScreen) {
            item.classList.add('animate');
        }
    });
}

function isElementInViewport(element, offset = 0) {
    const scroll = window.scrollY || window.pageYOffset;
    const boundsTop = element.getBoundingClientRect().top + scroll;
    const viewport = {
        top: scroll,
        bottom: scroll + window.innerHeight - offset
    };
    const bounds = {
        top: boundsTop,
        bottom: boundsTop + element.clientHeight
    };

    // Checks if element has already been on screen (past scroll height)
    return bounds.top <= viewport.bottom;
}
