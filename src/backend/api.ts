import { Router, send } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";
import { Person } from "../common/types.ts";
import { BuyProduct } from "../common/types.ts";
import { Product } from "../common/types.ts";

// Session konfigurieren und starten
const session = new Session({ framework: "oak" });
await session.init();
export const usableSession = session.use()(session);

const persons: Person[] = [
    { id: "p01", firstName: "Hans", lastName: "Maulwurf" }
];

const decoder = new TextDecoder('utf-8');
const products:Product[] = JSON.parse(decoder.decode(await Deno.readFile("src/backend/assets/products.json")));



//var buyedProducts: BuyProduct[] = []
var boughtProducts: BuyProduct[] = [
    {id: "001", amount: 5, price: 10},
    {id: "002", amount: 4, price: 5}
]


const router = new Router();
router
    .get("/api/persons", cxt => {
        cxt.response.body = persons;
    })
    .get("/api/persons/:id", async ctx => {
        ctx.response.body = persons.find(p => p.id == ctx.params.id);
    })
    .get("/api/pic/:pic_name", async context => {
        const pic_name = context.params.pic_name;
        await send(context, `src/backend/assets/${pic_name}`); //von deno run (pfad)
    }) 
    .get("/api/getProducts", async context => {
        context.response.type = 'application/json';
        context.response.body = products;
    })
    .get("/api/getProduct/:id", async context => {
        const product_id = context.params.id;
        let singleProduct = null;
        context.response.type = 'application/json';
        products.forEach(product => {
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
            boughtProducts.forEach(product => {
                totalPrice += product.amount * product.price;
            });
        }
        context.response.body = totalPrice;
    })
    .put("/api/addProduct/:id", async context => {
        const product_id = context.params.id;
        if(product_id != undefined)
        {
            addProduct(product_id);
        }
        context.response.status = 200;
    }); 

export const api = router.routes();





function addProduct(product_id:string)
{
        let product = products.find(p => p.id == product_id);
        let productAlreadybought = boughtProducts.find(p => p.id == product_id);
        if(product != undefined)
        {
            if( productAlreadybought != undefined)
            {
                productAlreadybought.amount += 1;
            }
            else
            {
                boughtProducts.push( {
                    id: product_id,
                    amount: 1,
                    price: product.specialOffer
                } )
            }
        }
}