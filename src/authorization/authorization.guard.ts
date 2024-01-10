import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";

import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/roles.decorator";
// import { User } from "src/users/users.model";
// import { UsersService } from "src/users/users.service";
// import { UsersController } from "src/users/users.controller";

@Injectable()

export class AuthorizationGuard implements CanActivate {
    constructor (private reflector: Reflector) {}

    canActivate( context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest;
        const requiredRole = this.reflector.getAllAndOverride(ROLES_KEY, [context.getHandler(), context.getClass()]);
    
    // console.log('inside guard', request.User);
    // console.log('the required role', requiredRole);

    const userRole = (request as any).user?.role
    // return request
    // console.log(userRole)

    if (requiredRole !== userRole) return false;

    return true;
    }
} 