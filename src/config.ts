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
    host: "10.112.10.224",
    port: 8000,
  },
};

export default defaults;
