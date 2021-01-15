/// <reference lib="dom" />

import { Product } from "../common/types.ts";

export async function loadDetail() {
    
    const productId = new URLSearchParams(window.location.search).get("id");
    if(productId != null)
    {
        const productDetail = document.getElementById("productDetail");
        const porductResponse = await fetch(`/api/getProduct/${productId}`);
        const product:Product = await porductResponse.json();
        productDetail.innerHTML += `
            <div>
            <h1>${product.productName}</h1>
            <img src="api/pic/${product.imageName}" alt="${product.imageName}" width="200" height="200" />
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
}