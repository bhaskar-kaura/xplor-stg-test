import { Controller, Post, Body } from '@nestjs/common';
import { CourseService } from './services/course.serviceV1';
import {
  OnSelectCourseDto,
  SearchCourseDto,
  SelectCourseDto,
} from './dto/request-course.dto';

@Controller({ version: '1', path: 'course' })
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('search')
  search(@Body() searchCourseDto: SearchCourseDto) {
    return this.courseService.search(searchCourseDto);
  }

  @Post('on_search')
  onSearch(@Body() searchCourseDto: SearchCourseDto) {
    return this.courseService.onSearch(searchCourseDto);
  }

  @Post('/select')
  select(@Body() selectCourseDto: SelectCourseDto) {
    console.log(JSON.stringify(selectCourseDto));
    return this.courseService.select(selectCourseDto);
  }
  @Post('/on_select')
  onSelect(@Body() onselectCourseDto: OnSelectCourseDto) {
    console.log(onselectCourseDto);
    return this.courseService.onSelect(onselectCourseDto);
  }
}
