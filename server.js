const api = require('./api')
const server = require('http').createServer(api)

const sockets = require('./sockets')
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.listen(3000,()=>{
  console.log('listening to port 3000...')
})
sockets.listen(io)


