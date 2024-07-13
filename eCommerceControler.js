const express = require("express")
// const path = require("path")
const cartRouter = require("./src/routes/carrito.router.js") 
const productsRouter = require("./src/routes/products.router.js")

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", cartRouter)
app.use("/", productsRouter)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
