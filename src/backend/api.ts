import { Router, send } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";
import { Product, boughtProduct } from "../common/types.ts";

// Session konfigurieren und starten
const session = new Session({ framework: "oak" });
await session.init();
export const usableSession = session.use()(session);

const decoder = new TextDecoder('utf-8');
const productList:Product[] = JSON.parse(decoder.decode(await Deno.readFile("src/backend/assets/products.json")));

var boughtProducts: boughtProduct[] = [];


const router = new Router();
router
    .get("/api/pic/:pic_name", async context => {
        const pic_name = context.params.pic_name;
        await send(context, `src/backend/assets/${pic_name}`); //von deno run (pfad)
    }) 
    .get("/api/getAllProducts", async context => {
        context.response.type = 'application/json';
        context.response.body = productList;
    })
    .get("/api/getBoughtProducts", async context => {
        context.response.type = 'application/json';
        context.response.body = boughtProducts;
    })
    .get("/api/getProduct/:id", async context => {
        const product_id = context.params.id;
        let singleProduct = null;
        context.response.type = 'application/json';
        productList.forEach(product => {
            if(product.id == product_id)
            {
                singleProduct = product;
            }
        });
        context.response.body = singleProduct;
    })
    .get("/api/getPayout", async context => {
        context.response.type = 'text/plain';
        let totalPrice = 0;
        if(boughtProducts.length > 0)
        {
            boughtProducts.forEach(bought => {
                totalPrice += bought.amount * bought.product.specialOffer;
            });
        }
        context.response.body = totalPrice.toFixed(2);
    })
    .put("/api/incAmount/:id", async context => {
        const product_id = context.params.id;
        if(product_id != undefined)
        {
            increaseProductAmount(product_id);
        }
        context.response.status = 200;
    }) 
    .put("/api/decAmount/:id", async context => {
        const product_id = context.params.id;
        if(product_id != undefined)
        {
            decreaseProductAmount(product_id);
        }
        context.response.status = 200;
    })
    .put("/api/removeProduct/:id", async context => {
        const product_id = context.params.id;
        if(product_id != undefined)
        {
            removeProduct(product_id);
        }
        context.response.status = 200;
    });  

export const api = router.routes();





function increaseProductAmount(product_id:string)
{
        let product = productList.find(p => p.id == product_id);
        let productAlreadybought = boughtProducts.find(bought => bought.product.id == product_id);
        if(product != undefined)
        {
            if( productAlreadybought != undefined)
            {
                productAlreadybought.amount += 1;
                console.log("inc"+productAlreadybought.amount);
            }
            else
            {
                boughtProducts.push( {
                    product: product,
                    amount: 1,
                } )
                console.log("push");
            }
        }
}


function decreaseProductAmount(product_id:string)
{
        let productIndex = boughtProducts.findIndex(bought => bought.product.id == product_id);
        
        if(productIndex >= 0)
        {
            let productAlreadybought = boughtProducts[productIndex];
            if( productAlreadybought.amount > 1)
            {
                if (productAlreadybought.amount > 1)
                {
                    productAlreadybought.amount -= 1;
                    console.log("decrease"+productAlreadybought.amount);
                }
            }
            else if(productAlreadybought.amount == 1)
            {
                boughtProducts.splice(productIndex, 1);
                console.log("delete");
            }
        }
}


function removeProduct(product_id:string)
{
        let productIndex = boughtProducts.findIndex(bought => bought.product.id == product_id);
        if(productIndex >= 0)
        {
                boughtProducts.splice(productIndex, 1);
                console.log("removed");
        }
}