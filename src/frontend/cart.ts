/// <reference lib="dom" />

import { boughtProduct, Product } from "../common/types.ts";

var boughtProducts:boughtProduct[] = [];
var payoutPrice = 0.00;

async function loadBoughtProducts(){
    const boughtResponse = await fetch("/api/getBoughtProducts");
    boughtProducts = await boughtResponse.json();
    const totalPriceResponse = await fetch("/api/getPayout");
    payoutPrice =  parseFloat(await totalPriceResponse.text());
}

export async function loadCart() {
    const productList = document.getElementById("product-Container");
    const payoutText = document.getElementById("payoutPrice");
    await loadBoughtProducts();
    if(boughtProducts.length > 0)
    {
        boughtProducts.forEach(bought => {
            productList.innerHTML += `
                <div id="grid-productName">${bought.product.productName}</div>
                <div id="grid-articlePrice">${bought.product.specialOffer.toFixed(2)} CHF</div>
                <div id="grid-btnDec">
                    <button id="grid-btnDec-${bought.product.id}" type="button">-</button>
                </div>
                <div id="grid-amount">${bought.amount}</div>
                <div id="grid-btnInc">
                    <button id="grid-btnInc-${bought.product.id}" type="button">+</button>
                </div>
                <div id="grid-totalPrice">${(bought.product.specialOffer * bought.amount).toFixed(2)} CHF</div>
            `
        });

        boughtProducts.forEach(bought => {
            document.getElementById(`grid-btnDec-${bought.product.id}`).addEventListener("click", decAmount);
            document.getElementById(`grid-btnInc-${bought.product.id}`).addEventListener("click", incAmount);
        });

        payoutText.innerHTML = `Total Preis: ${payoutPrice.toFixed(2)}`;
        
    }
    else
    {
        productList.innerHTML += `
            <h2>Der Warenkorb ist Leer</h2>
        `;
    }

}

async function incAmount(event:any)
{
    const productID = event.target.id.split(`-`)[2];
    const request = await fetch(`/api/incAmount/${productID}`, {method: 'PUT'});
    console.log(productID);
    if(request.status != 200)
    {
        window.alert("Fehler: " + request.statusText);
    }
    location.reload();
}
async function decAmount(event:any)
{
    const productID = event.target.id.split(`-`)[2];
    const request = await fetch(`/api/decAmount/${productID}`, {method: 'PUT'});
    if(request.status != 200)
    {
        window.alert("Fehler: " + request.statusText);
    }
    location.reload();
}