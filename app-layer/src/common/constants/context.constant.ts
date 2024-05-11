import { timeStamp } from "console";

export const contextConstant = {
  /**
   * The Base Application Protocol ID, which uniquely identifies the application.
   * This ID is used for various purposes such as authentication, authorization, and
   * identifying the application in a distributed system.
   */
  bap_id: 'workerhub-bap.com',

  /**
   * The Base Application Protocol URI, which is the base URL for the application's API.
   * This URI is used as the starting point for constructing URLs for specific API endpoints.
   * It is crucial for routing and accessing the application's resources.
   */
  bap_uri: 'https://71de-115-245-207-90.ngrok-free.app/protocol/v1',

  action: "search",
  version: "1.1.0",
  ttl:"PT2M"
};
