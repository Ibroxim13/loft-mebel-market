const closeNavbarMenuIcon = document.querySelector(".close__navbar__menu__icon");
const navbarMenuIcon = document.querySelector(".navbar__menu__icon");
const navbarTop = document.querySelector(".navbar__top");

navbarMenuIcon.addEventListener("click", () => {
    navbarTop.style.left = "0";
})

closeNavbarMenuIcon.addEventListener("click", () => {
    navbarTop.style.left = "-100%";
})
