import {IsInt, IsString, Length} from "class-validator";
export class createPropertydto{
    @IsInt()
    price: number
    
    @IsString()
    name: string

    @IsString()
    description: string

}