const closeNavbarMenuIcon = document.querySelector(".close__navbar__menu__icon");
const navbarMenuIcon = document.querySelector(".navbar__menu__icon");
const navbarTop = document.querySelector(".navbar__top");
const slides = document.getElementsByClassName("slide");
const dots = document.getElementsByClassName("dot");
const cardsContent = document.querySelector(".cards__content")

navbarMenuIcon.addEventListener("click", () => {
    navbarTop.style.left = "0";
})

closeNavbarMenuIcon.addEventListener("click", () => {
    navbarTop.style.left = "-100%";
})


var currentIndex = 1;

function displaySlide(n) {
    currentIndex = n;

    if (currentIndex > slides.length) {
        currentIndex = 1;
    }
    if (currentIndex < 1) {
        currentIndex = slides.length;
    }
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[currentIndex - 1].style.display = "block";
    dots[currentIndex - 1].className = "dot active";
}

displaySlide(currentIndex);

function changeSlide(n) {
    currentIndex += n;
    displaySlide(currentIndex);
}

function currentSlide(n) {
    displaySlide(n);
}

let bestSellerProducts = [];

fetch(`https://652553ed67cfb1e59ce71adc.mockapi.io/bestsellers`, {
    method: "GET",
})
    .then(res => res.json())
    .then(data => {
        bestSellerProducts = data;
        innerCards(bestSellerProducts);
    })

function innerCards(data) {
    cardsContent.innerHTML = "";
    data.forEach(element => {
        cardsContent.innerHTML += `
                <div class="card">
                <div class="card__activities__content">
                        <div class="sell__percent__box">
                            <img src="./img/sell-icon.png" alt="">
                            <p class="sell__percent">25%</p>
                        </div>
                        <div class="liked__icon"><i class="bi bi-heart"></i></div>
                    </div>
                    <div class="card__header"><img src="${element.img}"></div>
                    <div class="card__bodier">
                        <h3 class="product__name__1">${element.name}</h3>
                        <div class="product__title">${element.title}</div>
                        <div class="product__price">$${element.price}</div>
                        <div class="product__size__text">Размеры</div>
                        <div class="product__content__box">
                            <div class="box">
                                <div class="product__box__title">ШИРИНА</div>
                                <p class="product__size">${element.width} СМ</p>
                            </div>
                            <div class="box">
                                <p>×</p>
                            </div>
                            <div class="box">
                                <div class="product__box__title">ГЛУБИНА</div>
                                <p class="product__size">${element.depth}СМ</p>
                            </div>
                            <div class="box">
                                <p>×</p>
                            </div>
                            <div class="box">
                                <div class="product__box__title">ВЫСОТА</div>
                                <p class="product__size">${element.height} СМ</p>
                            </div>
                        </div>
                        <button class="to__card">Добавить в корзину</button>
                    </div>
                </div>
            `
    });
}


