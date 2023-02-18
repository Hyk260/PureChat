const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", ws => {
  console.log("client connected");

  ws.on("message", message => {
    console.log(`received: ${message}`);

    if (message === "refresh") {
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send("reload");
        }
      });
    }
  });

  ws.on("close", () => {
    console.log("client disconnected");
  });
});
