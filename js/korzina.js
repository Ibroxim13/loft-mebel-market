let bestSellerProductsLink = "https://652553ed67cfb1e59ce71adc.mockapi.io/bestsellers";
const content = document.querySelector(".products__content")
const table = document.querySelector(".table__saved__products")
let savedProducts = [];

getProducts(bestSellerProductsLink);
function getProducts(link) {
    fetch(`${link}`)
        .then(res => res.json())
        .then(data => {
            savedProducts = data
            let arr = savedProducts.filter((item) => item.active)
            if (arr.length === 0) {
                table.innerHTML= "";
                table.innerHTML = `
                    <h1>Empty your cart</h1>
                `
            }
            else {
                innerProducts(arr, link)
            }

        })
}

function getProduct(id, link) {
    fetch(`${link}/${id}`)
        .then(res => res.json())
        .then(data => changeActiveProduct(data, link))
}

function changeActiveProduct(data, link) {
    data.active = false
    fetch(`${link}/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => getProducts(link))
}

function innerProducts(der, link) {
    content.innerHTML = ""
    der.forEach(item => {
        content.innerHTML += `
                    <tr>
                        <td>${item.name}</td>
                        <td>
                        <img class="image" src=${item.img}>
                        </td>
                        <td>$${item.price}</td>
                        <td>${item.width} * ${item.height} * ${item.depth}</td>
                        <td><button onclick='getProduct(${item.id} ,"${link}")' class="delete__btn__saved__product">Удалить</button></td>
                    </tr>
                    `
    })
}