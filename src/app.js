import {readFileSync } from "fs";
import express from "express"
const productos = JSON.parse(readFileSync("archivo.txt", "utf-8"));

const app = express();
const PORT = 8080

app.use(express.urlencoded({extended:true}))

app.get("/products",(req,res) =>{
    let limit = parseInt(req.query.limit)
    if (!limit) return res.send(JSON.stringify(productos))
    let productosFiltrados = productos.slice(0,limit)
    res.send(JSON.stringify(productosFiltrados))
})

app.get("/products/:pid",(req,res) =>{
    const producto = productos.find(producto => producto.id.toString() === (req.params.pid))
    if (!producto) return res.send("Producto no existe")
    res.send(JSON.stringify(producto))
})

app.listen(PORT, () =>{
    console.log(`Server escuchando en ${PORT}`)
})
