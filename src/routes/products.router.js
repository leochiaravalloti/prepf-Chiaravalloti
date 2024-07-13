const express = require("express")
const router = express.Router()
const fs = require("fs")

let products = []

// get
router.get("/products", (req, res) => {
    const limit = req.query.limit;
        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    console.log(products)
})

router.get("/products/:pid", (req, res) => {
    const prodId = req.params.pid
    let product = products.find((prod)=> prod.id === prodId)
    if(!product){
        res.json({mensage: "No existe un producto con ese ID"})
    }
    res.json(product)
} )




// post
router.post("/products", (req, res) => {
    const body = req.body
    const newProduct = {
        id: generarId(),
        title: body.title,
        description: body.description,
        code: body.code,
        price: parseInt(body.price),
        status: body.status, 
        stock: parseInt(body.stock),
        category: body.category,
        thumbnails: body.thumbnails
    }
    products.push(newProduct)
    updateArchivo(products)
    res.json({ message: "El producto fue agregado correctamente"})
})
// actualizacion de prpiedades concretas
router.put("/products/:pid", (req, res)=>{
    
})

// delete

router.delete("/products/:pid", (req, res) => {
    let prodId = req.params.pid
    products = products.filter((z) => z.id !==  prodId)
    updateArchivo(products)
    res.json({message: "Producto eliminado correctamente"})
})


// generador de id
let accounter = 0
function generarId(){
    accounter++
    let id = accounter
    return id
}


function updateArchivo(products){
    fs.writeFile('productos.json', JSON.stringify(products, null, 2),err => {

        if (err) {

            console.error(err);

            return res.status(500).json({ error: 'Internal Server Error' });

        }
    })
}

module.exports = router