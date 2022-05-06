const { Router } = require('express')
const router = Router()
const dbProductos = require('../../contexts/producto')

router.get('/', (req, res) => {
    const items = dbProductos.getAll()
    res.render("index", {
        items, mensaje: 'No hay productos'
    })
})


module.exports = router