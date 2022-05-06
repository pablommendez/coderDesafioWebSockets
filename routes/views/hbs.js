const { Router } = require('express')
const router = Router()
const dbProductos = require('../../contexts/producto')

router.get('/', (req, res) => {
    res.render("index")
})

router.get('/productos', (req, res) => {
    const items = dbProductos.getAll()
    res.render("productos", {
        items, hasProducts: items.length > 0
    })
})

module.exports = router