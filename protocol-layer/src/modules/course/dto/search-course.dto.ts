// Import validation decorators from class-validator
import { IsNotEmpty, IsOptional } from 'class-validator';

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
