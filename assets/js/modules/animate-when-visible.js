class AnimateWhenVisible {
    constructor(options) {
        const defaults = {
            offset: 20,
            targetElement: '[data-behaviour="animate-when-visible"]',
            animationClassName: 'animate'
        };

        this.options = { ...defaults, ...options };

        window.addEventListener("load", () => {
            this.checkForAnimations();
        });

        window.addEventListener("scroll", () => {
            this.checkForAnimations();
        });
    }

    checkForAnimations() {
        document.querySelectorAll(`${this.options.targetElement}:not(${this.options.animationClassName})`).forEach((item) => {
            // Default offset is 20px
            const offset = item.dataset.animationOffSet ? item.dataset.animationOffSet : this.options.offset;
            const animationDelay = item.dataset.animationDelay ? item.dataset.animationDelay : 0;
            const isOnScreen = this.isElementInViewport(item, offset)

            if (animationDelay) {
                item.style.animationDelay = animationDelay;
            }

            if (isOnScreen) {
                item.classList.add(this.options.animationClassName);
            }
        });
    }

    isElementInViewport(element, offset = 0) {
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
}

module.exports = AnimateWhenVisible;