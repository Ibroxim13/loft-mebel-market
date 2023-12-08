const officeFurnitureCardsContent = document.querySelector(".office__furniture__cards__content");
const officeFurnitureProductsLink = "https://652553ed67cfb1e59ce71adc.mockapi.io/officefurniture";
let officeFurnitureProducts = [];

function getAllOfficeFurnitureProducts() {
    fetch(`${officeFurnitureProductsLink}`, {
        method: "GET",
    })
        .then(res => res.json())
        .then(data => {
            officeFurnitureProducts = data;
            innerCards(officeFurnitureProducts);
        })
}

getAllOfficeFurnitureProducts();

function innerCards(data) {
    officeFurnitureCardsContent.innerHTML = "";
    data.forEach(element => {
        officeFurnitureCardsContent.innerHTML += `
                <div class="card">
                <div class="card__activities__content">
                        <div class="sell__percent__box">
                            <img src="./img/sell-icon.png" alt="">
                            <p class="sell__percent">25%</p>
                        </div>
                        <div class="${element.saved ? "liked__icon__active" : "liked__icon"}"><i class="bi bi-heart" onclick = "getKOfficeFurnitureProduct(${element.id})"></i></div>
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

function getKOfficeFurnitureProduct(id) {
    fetch(`${officeFurnitureProductsLink}/${id}`)
        .then(res => res.json())
        .then(data => {
            changeOfficeFurnitureProductStatus(data)
        })
}

function changeOfficeFurnitureProductStatus(data) {
    if (data.saved) {
        data.saved = false;
    }
    else {
        data.saved = true;
    }
    fetch(`${officeFurnitureProductsLink}/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(item => item.json())
        .then(data => getAllOfficeFurnitureProducts())
}