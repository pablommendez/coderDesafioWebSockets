const socket = io();

socket.on("client_connected", data => {
  console.log(data)
  renderProduct(data.productos) 
  renderMessages(data.mensajes)
})
socket.on("new_product_added", data => {renderProduct(data.productos)})
socket.on("new_message_added", data => {renderMessages(data)})


const renderProduct = productos => {
  let html = productos.map((producto) => {
    return ` 
        <p><strong> ID:${producto.id} - ${producto.title}</strong> $${producto.price}  <img  width="200px" src="${producto.thumbnail}"></p>
    `;
  }).join(" ")

  document.querySelector("#productos").innerHTML = html
};

const renderMessages = mensajes => {
  const html = mensajes.map((msg) => {
    return ` 
        <p><strong>${msg.mail} dice:</strong> ${msg.message}</p>
    `;
  }).join(" ")
  document.querySelector('#chat').innerHTML = html
}
const getProduct = () => {
  return {
    title: document.querySelector("#title").value,
    price: document.querySelector("#price").value,
    thumbnail: document.querySelector("#thumbnail").value,
  }
};

const getMsg = () => {
  return {
    mail: document.querySelector('#mail').value,
    message: document.querySelector('#message').value
  }
}


const btnNewProduct = document.querySelector('#btnNewProduct')
btnNewProduct.addEventListener('click', e => {
  e.preventDefault()
  const newProduct = getProduct()
  socket.emit("new_product", newProduct);
})

const btnNewMessage = document.querySelector('#btnNewMessage')
btnNewMessage.addEventListener('click', e => {
  e.preventDefault()
  const msg = getMsg()
  socket.emit('new_message',msg)
})