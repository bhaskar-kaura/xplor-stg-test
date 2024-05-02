import { IsString, IsArray, IsUrl, IsNotEmpty, ArrayNotEmpty, ArrayUnique, IsOptional } from 'class-validator'
import { NetworkEnum } from '../../../common/constants/network.enum'

export class OnboardNetworkDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string | NetworkEnum

  @IsOptional()
  @IsArray({ message: 'Domains must be an array' })
  @ArrayNotEmpty({ message: 'At least one domain is required' })
  @ArrayUnique({ message: 'Domains must be unique' })
  domains: string[]

  @IsUrl({}, { message: 'BAP URL must be a valid URL' })
  @IsNotEmpty({ message: 'BAP URL is required' })
  bap_url: string

  @IsNotEmpty({ message: 'BAP ID is required' })
  @IsString({ message: 'BAP ID must be a string' })
  bap_id: string

  @IsUrl({}, { message: 'Callback URL must be a valid URL' })
  @IsNotEmpty({ message: 'Callback URL is required' })
  callback_url: string

  @IsUrl({}, { message: 'Registry URL must be a valid URL' })
  @IsNotEmpty({ message: 'Registry URL is required' })
  registry_url: string
}
