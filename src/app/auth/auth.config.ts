import { AUTH0_CLIENT_ID, AUTH_API_URL, APP_ID } from "../shared/constants";

export const AUTH_CONFIG = {
  // Needed for Auth0 (capitalization: ID):
  clientID: AUTH0_CLIENT_ID,
  // Needed for Auth0Cordova (capitalization: Id):
  clientId: AUTH0_CLIENT_ID,
  domain: AUTH_API_URL,
  packageIdentifier: APP_ID, // config.xml widget ID, e.g., com.auth0.ionic
};
