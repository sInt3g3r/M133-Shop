/// <reference lib="dom" />

import { Product } from "../common/types.ts";

const productId = new URLSearchParams(window.location.search).get("id");

export async function loadDetail() {
    if(productId != null)
    {
        const productDetail = document.getElementById("productDetail");
        const porductResponse = await fetch(`/api/getProduct/${productId}`);
        const product:Product = await porductResponse.json();
        productDetail.innerHTML += `
            <div>
                <h3>${product.productName}</h3>
                <img src="api/pic/${product.imageName}" alt="${product.imageName}" width="200" height="200" />
                    <div class="priceTag">
                        <p style="font-weight:bold;">Aktion: ${product.specialOffer.toFixed(2)} CHF</p>
                        <p style="text-decoration: line-through;">Normaler Preis: ${product.normalPrice.toFixed(2)} CHF</p>
                    </div>
            </div>
        `;
    }

    const cartText = document.getElementById("cartText");
    const payoutResponse = await fetch("/api/getPayout");
    const cartPrice = await payoutResponse.text();
    cartText.innerHTML += `
    <div>
        <a href="/cart.html">Warenkorb ${cartPrice}</a>
    </div>`;

    document.getElementById("cartIcon").addEventListener("click", addItemToCart);
}

async function addItemToCart()
{
    const request = await fetch(`/api/incAmount/${productId}`, {method: 'PUT'});
    console.log(productId);
    if(request.status != 200)
    {
        window.alert("Fehler: " + request.statusText);
    }
    else
    {
        window.location.href ="/index.html";
    }
}