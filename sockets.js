function listen(io) {
  let rdyPlayerCount = 0;
  let room;

  io.on("connection", (socket) => {
    console.log("a user has connected", socket.id);

    socket.on("ready", () => {
      room = "room" + Math.floor(rdyPlayerCount / 2);
      socket.join(room);
      console.log("Player ready", socket.id);

      rdyPlayerCount++;
      if (rdyPlayerCount % 2 === 0) {
        io.in(room).emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.to(room).emit("paddleMove", paddleData);
    });
    socket.on("ballMove", (ballData) => {
      socket.to(room).emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log("user disconnected", reason);
      socket.leave(room);
    });
  });
}

module.exports = {
  listen,
};
