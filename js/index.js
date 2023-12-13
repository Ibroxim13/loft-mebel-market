const cardsContent = document.querySelector(".cards__content")
const likedIcon = document.querySelector(".navbar__activity .bi-heart");
const bestSellerProductsLink = "https://652553ed67cfb1e59ce71adc.mockapi.io/bestsellers";
let likedProducts = [];
let bestSellerProducts = [];

getAllProducts();
function getAllProducts() {
    fetch(`${bestSellerProductsLink}`, {
        method: "GET",
    })
        .then(res => res.json())
        .then(data => {
            bestSellerProducts = data;
            innerCards(bestSellerProducts);
            likedProducts = data.filter(item => item.saved == true);
            innerLikedCount();
        })
}

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
                        <div class="${element.saved ? "liked__icon__active" : "liked__icon"}" onclick = "getProduct(${element.id})"><i class="bi bi-heart"></i></div>
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

function getProduct(id) {
    fetch(`${bestSellerProductsLink}/${id}`)
        .then(res => res.json())
        .then(data => {
            changeProductStatus(data)
        })
}

function changeProductStatus(data) {
    if (data.saved) {
        data.saved = false;
    }
    else {
        data.saved = true;
    }
    fetch(`${bestSellerProductsLink}/${data.id}`, {
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

function getIdToDisplay(id) {
    displayData = {
        id: id,
        url: bestSellerProductsLink,
        type: "Хиты продаж"
    }
    localStorage.setItem("dataToDisplay", JSON.stringify(displayData));
    window.location.href = "aboutProduct.html";
}