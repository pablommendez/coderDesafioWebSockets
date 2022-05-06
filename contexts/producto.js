class ProductosEnMemoria {
    constructor() {
        this.productos = []
    }

    getAll() {
        try {
            return this.productos
        } catch ({message}) {
            throw Error(message)
        }
    }

    getById(id) {
        const producto = this.productos.find(item => item.id == id)
        if (!producto) throw Error("producto no encontrado")
        return producto
    }

    add(producto) {
        try {
            if(!producto.id) producto['id'] = this.getLastId() + 1
            this.productos.push(producto)
        } catch (error) {
            throw error
        }
    }

    update(productoActualizado) {
        try {
            const productoAnterior = this.getById(productoActualizado.id)
            if(productoActualizado.id != productoAnterior.id) throw Error("no se puede actualizar el id de un producto")
            this.productos = this.productos.map(producto => producto.id == productoActualizado.id ? { ...productoAnterior, ...productoActualizado } : producto)
        } catch (error) {
            throw error
        }
    }

    delete(id) {
        try {
            this.getById(id)
            this.productos = this.productos.filter(producto => producto.id != id)
        } catch (error) {
            throw error
        }
    }

    getLastId() {
        if (this.productos.length === 0) {
            return 0
        }
        const lastIndex = this.productos.length - 1
        return Number(this.productos[lastIndex].id)
    }
}

module.exports = new ProductosEnMemoria()