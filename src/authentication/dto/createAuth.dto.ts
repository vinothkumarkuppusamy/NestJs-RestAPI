import {IsInt, IsString, Length} from "class-validator";
export class createAuthDto{
    @IsString({ always: true})
    @Length(2, 10, { message: 'Username must be between 2 and 10 characters long', groups: ['create'] })
    name: string;
    @IsString({ always : true})
    email: string;
    @IsString({ always: true})
    password: string;
    @IsInt({ always: true})
    age: number
}