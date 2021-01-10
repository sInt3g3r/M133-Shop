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
        const pic = await fetch(`/api/pic/${product.imageName}`);
        productDiv.innerHTML += pic;
        //console.log(product.id,product.productName);
    }
    //console.log(log);
}