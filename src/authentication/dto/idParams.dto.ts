import { IsInt, IsPositive } from "class-validator";

export class idparamsPipe{
    @IsInt()
    @IsPositive()
    id: number;
}