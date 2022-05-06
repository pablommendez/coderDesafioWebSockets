const { Router } = require("express");
const Producto = require('../../models/Producto')
const dbProductos = require('../../contexts/producto')


const router = Router()
router.get('/', (_, res) => {
    try {
        const productos = dbProductos.getAll()
        res.status(200)
            .json(productos)

    } catch ({ message }) {
        res.status(500)
            .json({ error: message })
    }
})

router.get('/:id', (req, res) => {
    try {
        const id = req.params.id
        res.status(200).
            json(dbProductos.getById(id))
    } catch ({ message }) {
        res.status(404)
            .json({ error: message })
    }
})

router.post('/', (req, res) => {
    try {
        const { title, price, thumbnail } = req.body
        const idProducto = String(dbProductos.getLastId() + 1)
        const producto = new Producto(idProducto, title, Number(price), thumbnail)
        dbProductos.add(producto)
        res.status(201)
            .json(producto)
    } catch ({ message }) {
        res.status(500)
            .json({ error: message })
    }
})

router.put('/:id', (req, res) => {
    try {
        const id = req.params.id
        const { title, price, thumbnail } = req.body
        const producto = new Producto(id, title, Number(price), thumbnail)
        dbProductos.update(producto)
        res.status(204).send()
    } catch ({ message }) {
        res.status(404)
            .json({ error: message })
    }
})

router.delete('/:id', (req, res) => {
    try {
        const id = req.params.id
        dbProductos.delete(id)
        res.status(204).send()
    } catch ({ message }) {
        res.status(404)
            .json({ error: message })
    }
})

module.exports = router