/// <reference lib="dom" />

import { Product } from "../common/types.ts";
// import { Person } from "../common/types.ts";

export async function loadCart() {
    const productList = document.getElementById("productList");
    productList.innerHTML += `
    <ul>
    </ul>
    `
}