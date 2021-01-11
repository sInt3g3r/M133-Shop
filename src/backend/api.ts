import { Router, send } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";
import { Person } from "../common/types.ts";

// Session konfigurieren und starten
const session = new Session({ framework: "oak" });
await session.init();
export const usableSession = session.use()(session);

const persons: Person[] = [
    { id: "p01", firstName: "Hans", lastName: "Maulwurf" }
];

var warenkorbPrice = 5.50;
var id = 


const router = new Router();
router
    .get("/api/persons", cxt => {
        cxt.response.body = persons;
    })
    .get("/api/persons/:id", async ctx => {
        ctx.response.body = persons
            .find(p => p.id == ctx.params.id);
    })
    .get("/api/pic/:pic_name", async context => {
        const pic_name = context.params.pic_name;
        await send(context, `src/backend/assets/${pic_name}`); //von deno run (pfad)
    }) 
    .get("/api/getProducts", async context => {
        context.response.type = 'application/json';
        context.response.body = await Deno.readFile("src/backend/assets/products.json");
    })
    .get("/api/getPrice", async context => {
        context.response.type = 'text/plain';
        context.response.body = warenkorbPrice;
    })
    .post("/api/getProduct/:id", async context => {
        const id = await context.request.body({ type: "json" }).value;
    }); 

export const api = router.routes();