import WebSocket from "ws";
import parse from "parse-strings-in-object";
import rc from "rc";
import log4js from "log4js";

// import { toBuffer } from "osc-min";
import * as dgram from "dgram";

import defaults from "./config";
const appName = defaults.appName;

const config: typeof defaults = parse(rc(appName, defaults));

const logger = log4js.getLogger(appName);
logger.level = config.loglevel;

logger.info("started with config", config);
logger.debug("Debug logging enabled; output could be verbose!");

const main = async () => {
  const { toBuffer } = await import("osc-min");

  const udp = config.osc.enable ? dgram.createSocket("udp4") : null;

  if (udp && config.osc.initTest) {
    logger.warn(
      "OSC initTest; will send zero value to",
      config.osc.address,
      "..."
    );
    const buf = toBuffer({
      address: config.osc.address,
      args: [0],
    });
    udp.send(buf, 0, buf.byteLength, config.osc.port, config.osc.host);
  }

  if (config.ws.enable) {
    const { host, port } = config.ws;
    logger.info(`Connecting WS at ws://${host}:${port} ...`);
    const websocketClient = new WebSocket(`ws://${host}:${port}`);

    // logger.debug({ websocketClient });

    websocketClient.on("error", console.error);

    websocketClient.on("open", () => {
      logger.info("connected!");
    });

    websocketClient.on("message", (data, isBinary) => {
      // console.log({ data, isBinary });
      const value = data.toString();
      logger.info("incoming from websockt:", value);

      if (udp && config.osc.enable) {
        try {
          const angleAsNumber = parseFloat(value);
          const buf = toBuffer({
            address: config.osc.address,
            args: [angleAsNumber],
          });
          udp.send(buf, 0, buf.byteLength, config.osc.port, config.osc.host);
        } catch (e) {
          logger.error("Error sending OSC:", e);
        }
      }
    });
  }
};

main();
