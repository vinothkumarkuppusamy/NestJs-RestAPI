import { PartialType } from "@nestjs/mapped-types";
import { createProductSchema } from "./createProduct.dto";


export class UpdateProductDto  {
    name: string;
    price: number;
    description: string;
}