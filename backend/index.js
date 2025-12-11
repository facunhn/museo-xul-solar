import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, startServer } from "soquetic";

function Obras() {
let obras = JSON.parse(fs.readFileSync("../data/obras.json", "utf-8"));
return obras;
}
subscribeGETEvent("obras", Obras);

function g2(info) {
let coleccion = JSON.parse(fs.readFileSync("../data/coleccion.json", "utf-8"));

if (info.enColección === true) {
coleccion.push(info.id);
fs.writeFileSync("../data/coleccion.json", JSON.stringify(coleccion, null, 2));
return true;
}
else {

    coleccion = coleccion.filter(id =>  id !== info.id);  // => es igual a entonces Anotación: !== quiere decir si no es igual a...
    
    fs.writeFileSync("../data/coleccion.json", JSON.stringify(coleccion,null, 2));
    
    return false;
    }
}

subscribePOSTEvent("modificarColección", g2);
function coleccionids() {
let coleccion = JSON.parse(fs.readFileSync("../data/coleccion.json", "utf-8"));
return coleccion;
}
subscribeGETEvent("colección", coleccionids);

function obrascoleccion() {
let coleccion = JSON.parse(fs.readFileSync("../data/coleccion.json", "utf-8"));
let obras = JSON.parse(fs.readFileSync("../data/obras.json", "utf-8"));

let filtradas = obras.filter(function (obra) {
return coleccion.includes(obra.id);
});

return filtradas;
}
subscribeGETEvent("obrasColección", obrascoleccion);
startServer();