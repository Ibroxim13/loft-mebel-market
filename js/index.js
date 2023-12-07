const cardsContent = document.querySelector(".cards__content")

let bestSellerProducts = [];

function getAllProducts() {
    fetch(`https://652553ed67cfb1e59ce71adc.mockapi.io/bestsellers`,{
        method: "GET",
    })
        .then(res => res.json())
        .then(data => {
            bestSellerProducts = data;
            innerCards(bestSellerProducts);
        })
}

getAllProducts();

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

function getProduct(id) {
    fetch(`https://652553ed67cfb1e59ce71adc.mockapi.io/bestsellers/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.saved) {
                changeProductStatusToFalse(data);
            }
            else {
                changeProductStatusToTrue(data);
            }
        })
}

function changeProductStatusToTrue(data) {
    data.saved = true;
    fetch(`https://652553ed67cfb1e59ce71adc.mockapi.io/bestsellers/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(item => item.json())
        .then(data => getAllProducts())
}

function changeProductStatusToFalse(data) {
    data.saved = false;
    fetch(`https://652553ed67cfb1e59ce71adc.mockapi.io/bestsellers/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(item => item.json())
        .then(data => getAllProducts())
}