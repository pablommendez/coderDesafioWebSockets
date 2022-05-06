const mensajes = require('../contexts/mensajes');
const productos = require('../contexts/producto')
const socketEvents = io => {
  io.on("connection", async (socket) => {
    console.log("a user connected");

    socket.emit("client_connected", {
      productos: productos.getAll(),
      mensajes: await mensajes.getAll()
    })
    //Escuchar
    socket.on("new_product", producto => {
      productos.add(producto)
      io.sockets.emit('new_product_added', {
        productos: productos.getAll()
      })
    })

    //Escuchar chat cliente
    socket.on("new_message", async data => {
      await mensajes.save(data)
      const newMessages = await mensajes.getAll()
      io.sockets.emit("new_message_added", newMessages)
    });
  });
}

module.exports = socketEvents