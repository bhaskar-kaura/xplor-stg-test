import { PartialType } from '@nestjs/mapped-types';
import { CreateRetailDto } from './create-retail.dto';

export class UpdateRetailDto extends PartialType(CreateRetailDto) {}
