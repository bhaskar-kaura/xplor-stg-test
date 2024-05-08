import { IsNotEmpty, IsOptional } from 'class-validator';

export class SearchCourseDto {
  @IsNotEmpty()
  context: any;

  @IsNotEmpty()
  message: any;

  @IsOptional()
  gatewayUrl: string;
}
