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
            <p style="font-weight:bold;">Aktion: ${product.specialOffer.toFixed(2)} CHF</p>
            <p style="text-decoration: line-through;">Normaler Preis: ${product.normalPrice.toFixed(2)} CHF</p>
        </div>
        </div>
        `;
    }

    const cartText = document.getElementById("cartText");
    const payoutResponse = await fetch("/api/getPayout");
    const cartPrice =  parseFloat(await payoutResponse.text());
    cartText.innerHTML += `
    <div>
        <a href="/cart.html">Warenkorb ${cartPrice.toFixed(2)} CHF</a>
    </div>`;

    const boughtResponse = await fetch("/api/getBoughtProducts");
    const boughtProducts = await boughtResponse.text();
}