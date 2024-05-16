import { PartialType } from '@nestjs/mapped-types';
import { SearchScholarshipDto } from './search-scholarship.dto';

export class UpdateScholarshipDto extends PartialType(SearchScholarshipDto) {}
