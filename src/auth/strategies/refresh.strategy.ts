import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { AuthJWTPayload } from "../types/auth-jwt";
import { Inject, Injectable } from "@nestjs/common";
import refreshJwtConfig from "../config/refresh.jwt.config";
import { Request } from "express";
import { AuthService } from "../auth.service";

@Injectable()
export class RefreshjwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
    
    constructor(@Inject(refreshJwtConfig.KEY) refreshJwtConfiguration:ConfigType<typeof refreshJwtConfig>,
    private authService: AuthService
    ) {
        super({  
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: refreshJwtConfiguration.secret,
            ignoreExpiration: false ,
            passReqToCallback: true //we can access the request to validate function
        })
    }

    validate(req: Request, payload: AuthJWTPayload){
        const refreshToken = req.get("authorization").replace("Bearer","").trim();
        const userId = payload.sub;
         return this.authService.validateRefreshToken(userId, refreshToken);  // its return request.user value
    }
}