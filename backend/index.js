import fs from "fs"; // Importa el módulo FS de Node.js para leer/escribir archivos
import { subscribeGETEvent, subscribePOSTEvent, startServer } from "soquetic"; // Importa funciones del framework soquetic para manejar peticiones
function Obras() { // Declara la funcion y no tiene parametro
let obras = JSON.parse(fs.readFileSync("../data/obras.json", "utf-8")); // lee el archivo y lo convierte en un array y lo guarda el resultado en la variable
return obras; // Devuelve el array de obras al código que llamó a esta función
}
subscribeGETEvent("obras", Obras); // Registra la función Obras para responder a peticiones GET en la ruta "/obras"
function g2(info) { // Declara una función  que recibe un parámetro llamado info y agrega o elimina una obra de la colección del usuario
let coleccion = JSON.parse(fs.readFileSync("../data/coleccion.json", "utf-8")); //lee el archivo y lo convierte en un array y lo guarda el resultado en la variable
if (info.enColección === true) { //Verifica si la propiedad enColección del objeto info es true
coleccion.push(info.id); //Agrega el id de la obra al array coleccion
fs.writeFileSync("../data/coleccion.json", JSON.stringify(coleccion, null, 2)); //Guarda el array actualizado en el archivo JSON y convierte el objeto a texto JSON con indentación de 2 espacios
return true; //Devuelve true para confirmar que esta bien
}
else { //La otra opcion en 
    coleccion = coleccion.filter(id =>  id !== info.id);  // Filtra el array, manteniendo solo los IDs que NO sean iguales a info.id, => = entonces, !== quiere decir si no es igual a...,
    
    fs.writeFileSync("../data/coleccion.json", JSON.stringify(coleccion,null, 2)); // Guarda el array actualizado en el archivo JSON y convierte el objeto a texto JSON con indentación de 2 espacios
    
    return false; //Devuelve false indicando que se eliminó (o que no estaba en colección)
    }
}
subscribePOSTEvent("modificarColección", g2); // Registra la función g2 para responder a peticiones POST en la ruta "/modificarColección"
function coleccionids() { // Declara la función coleccionids sin parámetros
let coleccion = JSON.parse(fs.readFileSync("../data/coleccion.json", "utf-8")); // Lee el archivo coleccion.json y convierte el JSON a un array de IDs
return coleccion; // Devuelve el array con todos los IDs que están en la colección
}
subscribeGETEvent("colección", coleccionids); // Registra la función coleccionids para responder a peticiones GET en la ruta "/colección"
function obrascoleccion() { // Declara la función obrascoleccion sin parámetros
let coleccion = JSON.parse(fs.readFileSync("../data/coleccion.json", "utf-8")); // Lee y parsea el archivo con los IDs de la colección
let obras = JSON.parse(fs.readFileSync("../data/obras.json", "utf-8")); // Lee y parsea el archivo con todas las obras disponibles
let filtradas = obras.filter(function (obra) { // Filtra el array de obras usando una función que se ejecuta para cada obra
return coleccion.includes(obra.id); // Retorna true si el ID de la obra actual está incluido en el array coleccion (mantiene solo las obras que están en la colección)
});
return filtradas; // Devuelve el array con las obras completas que están en la colección del usuario
}
subscribeGETEvent("obrasColección", obrascoleccion); // Registra la función obrascoleccion para responder a peticiones GET en la ruta "/obrasColección"
startServer(); // Inicia el servidor para que comience a escuchar y responder peticiones
