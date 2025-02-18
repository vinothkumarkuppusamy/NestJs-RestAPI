import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    //JWTmoduleOption is a return type
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRE_IN,
    },
  }),
);
