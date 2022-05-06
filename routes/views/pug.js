const { Router } = require('express')
const router = Router()
const dbProductos = require('../../contexts/producto')

router.get('/', (req, res) => {
    const items = dbProductos.getAll()
    res.render("tabla",{items, hasProducts: items.length > 0})
})
module.exports = router