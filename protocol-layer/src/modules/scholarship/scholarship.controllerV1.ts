import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScholarshipService } from './services/scholarship.serviceV1';
import { SearchScholarshipDto } from './dto/search-scholarship.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';

@Controller({ version: '1', path: 'scholarship' })
export class ScholarshipController {
  constructor(private readonly scholarshipService: ScholarshipService) {}

  @Post('search')
  search(@Body() searchScholarshipDto: SearchScholarshipDto) {
    return this.scholarshipService.search(searchScholarshipDto);
  }
}
