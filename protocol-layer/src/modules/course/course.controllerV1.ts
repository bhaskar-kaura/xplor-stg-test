import { Controller, Post, Body } from '@nestjs/common';
import { CourseService } from './services/course.serviceV1';
import { SearchCourseDto } from './dto/search-course.dto';

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
}
