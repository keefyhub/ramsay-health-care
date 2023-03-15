// NOTE - built with one sub-menu in mind but could be expanded toallow multiple menus
document.querySelectorAll('.menu-item.menu-item--has-children').forEach((element) => {
    element.addEventListener('click', (event) => {
        event.preventDefault();

        if (element.classList.contains('is-active')) {
            element.classList.remove('is-active');
        } else {
            element.classList.add('is-active');
        }
    });
});

const body = document.querySelector('body');
let mainMenuToggle = document.querySelector('[data-behaviour="hamburger"]');
let mainMenuTarget = document.querySelector('[data-target="main-menu"]');

mainMenuToggle.addEventListener('click', function (event) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;

    this.classList.toggle('is-active');

    if (null !== mainMenuTarget) {
        mainMenuTarget.classList.toggle('is-active');
    }
}, { passive: false });