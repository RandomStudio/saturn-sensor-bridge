const defaults = {
  appName: "SaturnSensorBridge",
  loglevel: "info",
  osc: {
    enable: true,
    host: "127.0.0.1",
    port: 3333,
    address: "/angles",
    initTest: false,
  },
  ws: {
    enable: true,
    host: "string",
    port: 8080,
  },
};

export default defaults;
