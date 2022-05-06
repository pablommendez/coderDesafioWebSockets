const express = require("express");
const app = express();
const hbs = require('express-handlebars')

//Archivos estaticos
app.use(express.static(__dirname + "/public"));

//Server
const http = require("http");
const port = process.env.PORT || 8080;
const server = http.createServer(app);

//Socket
const { Server } = require("socket.io");
const socketEventsConfig = require("./socketEvents/socketEvents");
const io = new Server(server);

//Coneccion Socket
socketEventsConfig(io)

const motorHbs = () => {
  const hbsRouter = require('./routes/views/hbs')
  app.engine(
      "hbs", hbs.engine({
          extname: ".hbs",
          defaultLayout: '',
          layoutsDir: ''
      })
  );
  app.set('view engine', 'hbs');
  app.set("views", "./public");
  app.use('/', hbsRouter)
}
motorHbs()

app.get('/', (req,res) => {
  res.sendFile('index.hbs',{root:'public'})
})

server.listen(port, () => {
  console.log("Server run on port " + port);
});
