import { Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken"
import { GRAPHQL_JWT_SECRET  } from './jwt.service'

export function verifyJWT(token: string) {
  //https://stackoverflow.com/questions/43915379/i-need-to-replace-bearer-from-the-header-to-verify-the-token
  var parts = token.split(' ');
  if (parts.length === 2) {
    var scheme = parts[0];
    var credentials = parts[1];

    if (/^Bearer$/i.test(scheme)) {
      //verify token
      let jwtPayload = jwt.verify(credentials, GRAPHQL_JWT_SECRET.key);
      return jwtPayload;
    }
 }
 return null;
}