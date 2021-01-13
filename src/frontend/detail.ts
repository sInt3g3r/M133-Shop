/// <reference lib="dom" />

import { Product } from "../common/types.ts";

export async function loadDetail() {
    
    const productId = new URLSearchParams(window.location.search).get("id");
    if(productId != null)
    {
        const productDetail = document.getElementById("productDetail");
        const porductResp = await fetch(`/api/getProduct/${productId}`);
        const product:Product = await porductResp.json();
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
    const httpResponse = await fetch("/api/getPayout");
    const warenkorbPrice = await httpResponse.text();
    console.log(warenkorbPrice);
    warenkorb.innerHTML += `
    <div>
        <a href="/cart.html">Warenkorb ${warenkorbPrice}</a>
    </div>`;
}