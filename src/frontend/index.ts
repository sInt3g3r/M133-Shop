/// <reference lib="dom" />

export async function loadOverview() {
    const productDiv = document.getElementById("products");
    const porductResponse = await fetch("/api/getAllProducts");
    const products = await porductResponse.json();
    for(const product of products)
    {
        productDiv.innerHTML += `
        <div>
        <img src="api/pic/${product.imageName}" alt="${product.imageName}" width="200" height="200" />
        <a href="detail.html?id=${product.id}">${product.productName}</a>
        <div class="priceTag">
            <p>Aktion: ${product.specialOffer}</p>
            <p>Normaler Preis: ${product.normalPrice}</p>
        </div>
        </div>
        `;
    }

    const warenkorb = document.getElementById("warenkorb");
    const payoutResponse = await fetch("/api/getPayout");
    const warenkorbPrice = await payoutResponse.text();
    console.log(warenkorbPrice);
    warenkorb.innerHTML += `
    <div>
        <a href="/cart.html">Warenkorb ${warenkorbPrice}</a>
    </div>`;

    const boughtResponse = await fetch("/api/getBoughtProducts");
    const boughtProducts = await boughtResponse.text();
    console.log(boughtProducts);
}