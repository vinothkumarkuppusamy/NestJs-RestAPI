import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { AuthJWTPayload } from "../types/auth-jwt";
import { Inject, Injectable } from "@nestjs/common";
import refreshJwtConfig from "../config/refresh.jwt.config";

@Injectable()
export class RefreshjwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
    
    constructor(@Inject(refreshJwtConfig.KEY) refreshJwtConfiguration:ConfigType<typeof refreshJwtConfig>
    ) {
        super({  
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: refreshJwtConfiguration.secret,
            ignoreExpiration: false  
        })
    }

    validate(payload: AuthJWTPayload){
        return {
            id: payload.sub,
        }
    }
}