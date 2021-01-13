/// <reference lib="dom" />

import { Product } from "../common/types.ts";
// import { Person } from "../common/types.ts";

export async function loadDetail() {
    // const personId = new URLSearchParams(window.location.search).get("personId"); 
    // const response = await fetch(`/api/persons/${personId}`);
    // const person: Person = await response.json();

    // document.querySelector("h1").innerText = `${person.firstName} ${person.lastName}`;
    // document.querySelector("span").innerText = person.id;

    const productId = new URLSearchParams(window.location.search).get("id");
    if(productId != null)
    {
        const productDetail = document.getElementById("productDetail");
        const porductResp = await fetch(`/api/getProduct/${productId}`);
        const product:Product = await porductResp.json();
        productDetail.innerHTML += `
            <p>${product.description}</p>
        `;
    }

}