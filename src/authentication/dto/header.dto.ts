import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
export class headerDto {
  @IsString()
  @Expose({name: "access-token"}) // Expose property to use given name validate the Dto property in same name
  accessToken: String;
}
