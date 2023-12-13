const livingRoomCardsContent = document.querySelector(".living__room__cards__content ");
const likedIcon = document.querySelector(".navbar__activity .bi-heart");
const livingRoomProductsLink = "https://652553ed67cfb1e59ce71adc.mockapi.io/livingrooms";
let likedProducts = [];
let livingRoomProducts = [];

function getAllLivingRoomProducts() {
    fetch(`${livingRoomProductsLink}`, {
        method: "GET",
    })
        .then(res => res.json())
        .then(data => {
            livingRoomProducts = data;
            innerCards(livingRoomProducts);
            likedProducts = data.filter(item => item.saved == true);
            innerLikedCount()
        })
}

getAllLivingRoomProducts();

function innerCards(data) {
    livingRoomCardsContent.innerHTML = "";
    data.forEach(element => {
        livingRoomCardsContent.innerHTML += `
                <div class="card">
                <div class="card__activities__content">
                        <div class="sell__percent__box">
                            <img src="./img/sell-icon.png" alt="">
                            <p class="sell__percent">25%</p>
                        </div>
                        <div class="${element.saved ? "liked__icon__active" : "liked__icon"}"><i class="bi bi-heart" onclick = "getLivingRoomProduct(${element.id})"></i></div>
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
    });
}

function getLivingRoomProduct(id) {
    fetch(`${livingRoomProductsLink}/${id}`)
        .then(res => res.json())
        .then(data => {
            changeLivingRoomProductStatus(data)
        })
}

function changeLivingRoomProductStatus(data) {
    if (data.saved) {
        data.saved = false;
    }
    else {
        data.saved = true;
    }
    fetch(`${livingRoomProductsLink}/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(item => item.json())
        .then(data => getAllLivingRoomProducts())
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
        url: livingRoomProductsLink,
        type: "Хиты продаж"
    }
    localStorage.setItem("dataToDisplay", JSON.stringify(displayData));
    window.location.href = "aboutProduct.html";
}