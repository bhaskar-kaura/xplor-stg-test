import { Controller, Post, Body } from '@nestjs/common';
import { ScholarshipService } from './services/scholarship.serviceV1';
import { SearchScholarshipDto } from './dto/search-scholarship.dto';
import {
  ConfirmScholarshipDto,
  InitScholarshipDto,
  OnConfirmScholarshipDto,
  SelectScholarshipDto,
} from './dto/request-scholarship.dtp';

@Controller({ version: '1', path: 'scholarship' })
export class ScholarshipController {
  constructor(private readonly scholarshipService: ScholarshipService) {}

  @Post('search')
  search(@Body() searchScholarshipDto: SearchScholarshipDto) {
    return this.scholarshipService.search(searchScholarshipDto);
  }
  @Post('on_search')
  on_search(@Body() searchScholarshipDto: SearchScholarshipDto) {
    return this.scholarshipService.on_search(searchScholarshipDto);
  }

  @Post('select')
  select(@Body() selectScholarshipDto: SelectScholarshipDto) {
    console.log('selectScholarshipDto', selectScholarshipDto);
    console.log('selectScholarshipDto', selectScholarshipDto);
    return this.scholarshipService.select(selectScholarshipDto);
  }

  @Post('on_select')
  on_select(@Body() searchScholarshipDto: SearchScholarshipDto) {
    return this.scholarshipService.on_select(searchScholarshipDto);
  }

  @Post('init')
  init(@Body() initCourseDto: InitScholarshipDto) {
    console.log(JSON.stringify(initCourseDto));
    return this.scholarshipService.init(initCourseDto);
  }
  @Post('on_init')
  onInit(@Body() onInitCourseDto: InitScholarshipDto) {
    console.log(onInitCourseDto);
    return this.scholarshipService.onInit(onInitCourseDto);
  }

  @Post('confirm')
  confirm(@Body() initCourseDto: ConfirmScholarshipDto) {
    console.log(JSON.stringify(initCourseDto));
    return this.scholarshipService.confirm(initCourseDto);
  }
  @Post('on_confirm')
  onconfirm(@Body() onConfirmScholarshipDto: OnConfirmScholarshipDto) {
    console.log(onConfirmScholarshipDto);
    return this.scholarshipService.onConfirm(onConfirmScholarshipDto);
  }
}
