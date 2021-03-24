import jwt from "express-jwt";
import jwtAuthz from "express-jwt-authz";
import jwksRsa from "jwks-rsa";
import { Handler } from "express";

/**
 * Authorization middleware. When used, the
 * Access Token must exist and be verified against
 * the Auth0 JSON Web Key Set
 */
export const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://mixr.us.auth0.com/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: "https://api.mixr.com/",
  issuer: `https://mixr.us.auth0.com/`,
  algorithms: ["RS256"],
});

/**
 * Return an express handler to check for required Auth0 scopes in
 * request token for different endpoints
 * @param scopes - Scopes required for this endpoint
 */
export const checkScopes = (...scopes: string[]): Handler => jwtAuthz(scopes);
