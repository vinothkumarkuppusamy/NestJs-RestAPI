import { registerAs } from '@nestjs/config';
import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';  // If we use refreshtoken config type use "JwtSignoption" donot use "jwtModuleOptions"

export default registerAs(
  'refresh- jwt',
  (): JwtSignOptions => ({
    //JWTmoduleOption is a return type
    secret: process.env.REFRESH_JWT_SECRET_KEY,
    expiresIn: process.env.REFRESH_JWT_EXPIRE_IN,
  }),
);
