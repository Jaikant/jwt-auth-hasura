import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken"
import { JWT_SECRET_TYPE, JWT_SECRET_KEY } from "../config.constants"

//TODO Move these to environment variables.
export const GRAPHQL_JWT_SECRET = {
  type: JWT_SECRET_TYPE,
  key: JWT_SECRET_KEY,
};

interface GenerateJWTParams {
  id: string;
  defaultRole: string;
  allowedRoles: string[];
  otherClaims?: Record<string, string | string[]>;
}

@Injectable()
export class JWTService {

JWT_CONFIG: jwt.SignOptions = {
  algorithm: JWT_SECRET_TYPE,
  expiresIn: "10h",
}

generateHasuraJWT(params: GenerateJWTParams): string {
  const payload = {
    sub: params.id,
    "https://hasura.io/jwt/claims": {
       "x-hasura-allowed-roles": params.allowedRoles,
       "x-hasura-default-role": params.defaultRole,
       ...params.otherClaims,
     }
  }
  return jwt.sign(payload, GRAPHQL_JWT_SECRET.key, this.JWT_CONFIG);
}
}
