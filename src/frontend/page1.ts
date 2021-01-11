/// <reference lib="dom" />

import { Person } from "../common/types.ts";

export async function loadOverview() {
    const response = await fetch("/api/persons");
    const persons: Person[] = await response.json();

    // const list = document.querySelector("ul");

    // for (const person of persons) {
    //     list.innerHTML += `
    //         <li>
    //             <a href="./page2.html?personId=${person.id}">${person.firstName} ${person.lastName}</a>
    //         </li>
    //     `;
    // }

    const productDiv = document.getElementById("products");
    const porductResp = await fetch("/api/getProducts");
    const products = await porductResp.json();
    for(const product of products)
    {
        productDiv.innerHTML += `
        <div>
        <img src="api/pic/${product.imageName}" alt="${product.imageName}" width="200" height="200" />
        <a href="page2.html">${product.productName}</a>
        <div class="priceTag">
            <p>${product.specialOffer}</p>
            <p>${product.normalPrice}</p>
        </div>
        </div>
        `;
    }
    //console.log(log);

    const warenkorb = document.getElementById("warenkorb");
    const warenkorbPrice = await fetch("/api/getPrice");
    warenkorb.innerHTML += `Warenkorb ${warenkorbPrice}`;

}