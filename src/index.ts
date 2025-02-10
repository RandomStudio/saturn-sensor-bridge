import WebSocket from "ws";

const ws = new WebSocket("ws://192.168.2.4:8000");

ws.on("error", console.error);

ws.on("open", function open() {
  console.log("connected!");

  ws.on("message", (data, isBinary) => {
    // console.log({ data, isBinary });
    const value = data.toString();
    console.log(value);
  });
});

// ws.send(array);
// });
