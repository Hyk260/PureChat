import { io } from "socket.io-client";

const socket = io(
  "http://localhost:3001/", //#'ws://127.0.0.1:3000',
  {
    path: "", //# socket.io 库默认服务端path为/socket.io
    transports: ["websocket", "xhr-polling", "jsonp-polling"], // #此配置在我的代码中表现为必须项，官方示例未列出，请指教
  }
);
console.log(socket);

socket.on("message", (res) => {
  console.log("#message: ", res);
});

// socket.emit("eventname", "你好啊！赛利亚");

socket.on("disconnect", () => {
  console.log("断开连接");
});

export default socket;
