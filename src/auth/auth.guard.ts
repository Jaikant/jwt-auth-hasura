import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verifyJWT } from './auth.functions';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request): boolean {
    if (!request.headers.authorization) {
      // return res.status(403).json({ error: 'No credentials sent!' });
      //TODO: How to send proper error code?
      return false;
    }
    let jwtPayload = verifyJWT(request.headers.authorization);
    if (!jwtPayload) {
      // return res.status(403).json({ error: 'No payload in jwt!' });
      //TODO: How to send proper error code?
      return false;
    }
    return true;
  }
}