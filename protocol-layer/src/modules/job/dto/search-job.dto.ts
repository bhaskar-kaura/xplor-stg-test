import { IsNotEmpty, IsOptional } from 'class-validator';

export class SearchJobDto {
  @IsNotEmpty()
  context: any;

  @IsNotEmpty()
  message: any;

  @IsOptional()
  gatewayUrl: string;
}
