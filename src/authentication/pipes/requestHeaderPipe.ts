import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

export const RequestHeader = createParamDecorator(
    async(targetDTo: any, ctx:ExecutionContext)=>{ //ExectionContext is a class context of execution context
    const headers = ctx.switchToHttp().getRequest().headers;
    const dto = plainToInstance(targetDTo, headers,{
        excludeExtraneousValues: true
    });
    await validateOrReject(dto);
    return dto;
})