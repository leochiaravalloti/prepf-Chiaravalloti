const express = require("express")
const router = express.Router()
const fs = require("fs")


const carts = []

// post
router.post("/carts", (req, res) => {
    const body = req.body
    const newCart = {
        id: cartIdGen(),
        products: body.products
    }
    carts.push(newCart)
    res.json({ message: "Carrito agregado" })
    updateArchivo(carts)
})

router.post("/carts/:cid/product/:pid ", (req, res) => {
    const body = req.body
    const cartId = req.params.cid
    const cart = carts.find(m=>m.id === cartId)
    const productIn = cart.find(a=>a.id === body.product)
    if(productIn){//Producto existe y ya está en el carrito
        productIn.quantity = productIn.quantity + parseInt(body.quantity)
    }else{ //Producto existe y no esta en el carrito
        productIn = {
        id: body.product,
        quantity: body.quantity
        }
    }
    carts = carts.filter(i => i.id != cartId)
    cart.push(productIn)
    carts.push(cart)
    updateArchivo(carts)
    return res.json({message: "Se sumo el producto al carrito"})  
} )

// get
router.get("/carts/:cid", (req, res) => {
    const cartId = req.params.cid
    const cart = carts.filter(m=>m.id === cartId)
    res.json(cart.products)
})


let accounter = 0
function cartIdGen(){
    accounter++
    let id = accounter
    return id
}

function updateArchivo(carts){
    fs.writeFile('carritos.json', JSON.stringify(carts, null, 2),err => {

        if (err) {

            console.error(err);

            return res.status(500).json({ error: 'Internal Server Error' });

        }
    })
}

module.exports = router