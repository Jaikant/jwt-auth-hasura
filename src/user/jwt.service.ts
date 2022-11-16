import * as jwt from "jsonwebtoken"

const HASURA_GRAPHQL_JWT_SECRET = {
  type: process.env.HASURA_JWT_SECRET_TYPE || "HS256",
  key: process.env.HASURA_JWT_SECRET_KEY ||
        "This-is-a-generic-hs256-secret-key-and-it-should-be-chnaged",
};

const JWT_CONFIG: jwt.SignOptions = {
  algorithm: HASURA_GRAPHQL_JWT_SECRET.type as "HS256" | "RS512",
  expiresIn: "10h",
}

interface GenerateJWTParams {
  defaultRole: string;
  allowedRoles: string[];
  otherClaims?: Record<string, string | string[]>;
}

export function generateJWT(params: GenerateJWTParams): string {
  const payload = {
    "https://hasura.io/jwt/claims": {
       "x-hasura-allowed-roles": params.allowedRoles,
       "x-hasura-default-role": params.defaultRole,
       ...params.otherClaims,
     }
  }
  return jwt.sign(payload, HASURA_GRAPHQL_JWT_SECRET.key, JWT_CONFIG);
}

export function verifyJWT(token: string) {

  console.log(`token is ${token}`);

  //https://stackoverflow.com/questions/43915379/i-need-to-replace-bearer-from-the-header-to-verify-the-token
  var parts = token.split(' ');
  if (parts.length === 2) {
    var scheme = parts[0];
    var credentials = parts[1];

    if (/^Bearer$/i.test(scheme)) {
      //verify token
      let jwtPayload = jwt.verify(credentials, HASURA_GRAPHQL_JWT_SECRET.key);
      console.log(`the jwt payload is ${JSON.stringify(jwtPayload)}`);
      return jwtPayload;
    }
 }
 return null;
}
