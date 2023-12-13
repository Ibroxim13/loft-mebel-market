const navbarMenuOpen = document.querySelector(".navbar__menu__icon");
const navbarMenuClose = document.querySelector(".close__navbar__menu__icon");
const navbarMenu = document.querySelector(".navbar__top");

navbarMenuOpen.addEventListener("click", () => {
    navbarMenu.style.left = 0;
})

navbarMenuClose.addEventListener("click", () => {
    navbarMenu.style.left = "-100%";
})
