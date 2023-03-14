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
})