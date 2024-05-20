import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

/**
 * Data Transfer Object (DTO) for the context of a search request.
 * Validates the context information required for a search operation.
 */
export class ContextDto {
  @IsNotEmpty({ message: 'Domain is required' })
  @IsString({ message: 'Domain must be a string' })
  domain: string;
  @IsNotEmpty({ message: 'Transaction ID is required' })
  @IsString({ message: 'Transaction ID must be a string' })
  transaction_id: string;

  @IsNotEmpty({ message: 'Message ID is required' })
  @IsString({ message: 'Message ID must be a string' })
  message_id: string;

  @IsNotEmpty({ message: 'TTL is required' })
  @IsString({ message: 'TTL must be a string' })
  ttl: string;
}

class BillingDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Phone is required' })
  @IsString({ message: 'Phone must be a string' })
  phone: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  email: string;

  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  address: string;

  @IsNotEmpty({ message: 'Gender is required' })
  @IsString({ message: 'Gender must be a string' })
  gender: string;

  @IsNotEmpty({ message: 'Age is required' })
  @IsString({ message: 'Age must be a string' })
  age: string;
}
class OrderItem {
  @ValidateNested()
  @Type(() => BillingDto)
  billing: BillingDto;
}

class MessageDto {
  @ValidateNested()
  @Type(() => OrderItem)
  order: OrderItem;
}
/**
 * Data Transfer Object (DTO) for a search request.
 * Validates the search request information required for an init operation.
 */
export class InitRequestDto {
  @IsNotEmpty({ message: 'Context is required' })
  @IsObject({ message: 'Context must be a object' })
  context: ContextDto;

  @IsNotEmpty({ message: 'Message is required' })
  @IsObject({ message: 'Message must be a object' })
  message: MessageDto;
}
