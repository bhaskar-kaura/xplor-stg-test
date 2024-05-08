import { IsNotEmpty, IsObject, IsString } from 'class-validator';

class ContextDto {
  @IsNotEmpty({ message: 'Context is required' })
  @IsObject({ message: 'Context must be a object' })
  bap_id: string;

  @IsNotEmpty({ message: 'Bap Uri is required' })
  @IsString({ message: 'Bap Uri must be a String' })
  bap_uri: string;

  @IsNotEmpty({ message: 'Country is required' })
  @IsString({ message: 'Country must be a String' })
  country: string;

  @IsNotEmpty({ message: 'City is required' })
  @IsString({ message: 'City must be a String' })
  city: string;

  @IsNotEmpty({ message: 'Message id is required' })
  @IsString({ message: 'Message id must be a String' })
  message_id: string;

  @IsNotEmpty({ message: 'Transaction id is required' })
  @IsString({ message: 'Transaction id must be a String' })
  transaction_id: string;

  @IsNotEmpty({ message: 'Search query is required' })
  @IsString({ message: 'Search query must be a String' })
  search_query: string;
}
export class SearchRequestDto {
  @IsNotEmpty({ message: 'Context is required' })
  @IsObject({ message: 'Context must be a object' })
  context: ContextDto;
}
