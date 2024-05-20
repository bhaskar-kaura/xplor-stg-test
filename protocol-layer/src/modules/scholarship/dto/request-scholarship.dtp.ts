import { IsNotEmpty, IsOptional } from "class-validator";
import { IScholarshipSelect } from "../interface/request/select";
import { ISelectContext } from "../interface/context";

export class SelectScholarshipDto {
    // The context property must not be empty
    @IsNotEmpty()
    context: ISelectContext;
  
    // The message property must not be empty
    @IsNotEmpty()
    message: IScholarshipSelect;
  
    // The gatewayUrl property is optional and must be a string if provided
    @IsOptional()
    gatewayUrl: string;
  }