const likedIcon = document.querySelector(".navbar__activity .bi-heart");
const aboutProductContent = document.querySelector(".about__product__content");
const aboutProductNavigator = document.querySelector(".about__product__navigator");
const cardsContent = document.querySelector(".cards__content");
const bestSellerProductsLink = "https://652553ed67cfb1e59ce71adc.mockapi.io/bestsellers";
let checker = JSON.parse(localStorage.getItem("liked"));
let dataToDisplay = JSON.parse(localStorage.getItem("dataToDisplay"));
let bestSellerProducts = [];

if (checker.length > 0) {
    likedIcon.style.color = "red";
}
else {
    likedIcon.style.color = "black";
}
getProduct()
function getProduct() {
    fetch(`${dataToDisplay.url}/${dataToDisplay.id}`)
        .then(res => res.json())
        .then(data => innerAboutProduct(data))
}

function innerAboutProduct(data) {
    aboutProductNavigator.innerHTML = '';
    aboutProductNavigator.innerHTML += `
    <a href = "index.html" class="location__name">Главная</a>
    <div class="location__name">/</div>
    <div class="location__name">${dataToDisplay.type}</div>
    `
    aboutProductContent.innerHTML = ``;
    aboutProductContent.innerHTML += `
    <div class="about__product__left">
    <img src="${data.img}" alt="" onclick = "getIdToDisplay(${data.id})">
</div>
<div class="about__product__right">
    <img src="./img/stara.png" alt="">
    <h3 class="about__product__name">${data.name}</h3>
    <p class="about__product__title">${data.title}</p>
    <div class="about__product__row">
        <div class="about__product__price">${data.price}₽</div>
        <button class="about__product__buy__btn">Купить</button>
        <div class="add__to__liked">
            <i class="bi bi-heart"></i>
            <p class="add__to__liked__text">Добавить в желаемое</p>
        </div>
    </div>
    <div class="about__product__info__row">
        <ul class="about__product__subtitle">
            <li>Количество</li>
            <li>
                <button>-</button>
                <p>${data.categoryId}</p>
                <button>+</button>
            </li>
        </ul>
        <ul class="about__product__info">
            <li>Размер (Д × Ш × В)</li>
            <li>${data.depth} СМ × ${data.width} СМ × ${data.height} СМ</li>
        </ul>
    </div>
    <h5 class="about__product__info__title">Описание</h5>
    <p class="about__product__info__text">
        Лаконичные линии и простые формы, безупречный стиль и индивидуальность – все это «${data.title}».
        Сдержанный скандинавский дизайн украсит любую современную обстановку. Элегантность, комфорт и
        функциональность, собранные воедино – ${data.title} просто создан для размеренного отдыха в кругу семьи
        или компании друзей!
    </p>
</div>
    `
}

let likedProducts = [];
getAllProducts()
function getAllProducts() {
    fetch(bestSellerProductsLink)
        .then(res => res.json())
        .then(data => {
            bestSellerProducts = data;
            innerBestSeller(bestSellerProducts);
            likedProducts = data.filter(item => item.saved == true);
            innerLikedCount();
        })
}


function innerBestSeller(data) {
    cardsContent.innerHTML = '';
    data.forEach(element => {
        cardsContent.innerHTML += `
        <div class="card">
        <div class="card__activities__content">
                <div class="sell__percent__box">
                    <img src="./img/sell-icon.png" alt="">
                    <p class="sell__percent">25%</p>
                </div>
                <div class="${element.saved ? "liked__icon__active" : "liked__icon"}" onclick = "getProductId(${element.id})"><i class="bi bi-heart"></i></div>
            </div>
            <div class="card__header"><img src="${element.img}" onclick = "getIdToDisplay(${element.id})"></div>
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
    })

}

function getIdToDisplay(id) {
    displayData = {
        id: id,
        url: bestSellerProductsLink,
        type: "Хиты продаж"
    }
    localStorage.setItem("dataToDisplay", JSON.stringify(displayData));
    window.location.href = "aboutProduct.html";
}

function getProductId(id) {
    fetch(bestSellerProductsLink + "/" + id)
        .then(res => res.json())
        .then(data => changeProductStatus(data))
}

function changeProductStatus(data) {
    if (data.saved) {
        data.saved = false;
    }
    else {
        data.saved = true;
    }
    fetch(bestSellerProductsLink + "/" + data.id, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(item => item.json())
        .then(data => getAllProducts())
}


function innerLikedCount() {
    if (likedProducts.length > 0) {
        likedIcon.style.color = "red";
    }
    else {
        likedIcon.style.color = "black";
    }

    localStorage.setItem("liked", JSON.stringify(likedProducts))
}