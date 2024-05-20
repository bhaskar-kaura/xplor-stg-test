// Import validation decorators from class-validator
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ISelectContext } from '../../scholarship/interface/context';
import { IOnSelectMessage } from '../../scholarship/interface/response/on-select';
import { ICourseSelectMessage } from '../interface/request/select';

// Define a Data Transfer Object (DTO) for search course payloads
export class SearchCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: any;

  // The message property must not be empty
  @IsNotEmpty()
  message: any;

  // The gatewayUrl property is optional and must be a string if provided
  @IsOptional()
  gatewayUrl: string;
}

export class SelectCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: ICourseSelectMessage;

  // The gatewayUrl property is optional and must be a string if provided
  @IsOptional()
  gatewayUrl: string;
}

export class OnSelectCourseDto {
  // The context property must not be empty
  @IsNotEmpty()
  context: ISelectContext;

  // The message property must not be empty
  @IsNotEmpty()
  message: IOnSelectMessage;

  // The gatewayUrl property is optional and must be a string if provided
  @IsOptional()
  gatewayUrl: string;
}
