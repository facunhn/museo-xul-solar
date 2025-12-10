import {subscribeGETEvent, subscribePOSTEvent, startServer } from "soquetic"
import fs from "fs";
startServer()

subscribeGETEvent("obras",obrasrespuesta)

function obrasrespuesta() {

    let respuesta = fs.readFileSync("../data/obras.json", "utf-8");
    console.log(respuesta)
    return JSON.parse (respuesta);
}

