import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateDumpDto {
  @IsString()
  @IsNotEmpty()
  transaction_id: string;

  @IsString()
  @IsNotEmpty()
  request_type: string;

  @IsString()
  @IsNotEmpty()
  message_id: string;

  @IsObject()
  @IsNotEmpty()
  context: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  message: string;

  constructor(partial: Partial<CreateDumpDto>) {
    Object.assign(this, partial);
  }
}
