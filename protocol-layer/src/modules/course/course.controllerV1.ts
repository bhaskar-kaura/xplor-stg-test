import { Controller, Post, Body } from '@nestjs/common';
import { CourseService } from './services/course.serviceV1';
import { InitCourseDto, OnInitCourseDto, OnSelectCourseDto, SearchCourseDto, SelectCourseDto } from './dto/request-course.dto';

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

  @Post('init')
  init(@Body() initCourseDto: InitCourseDto) {
    console.log('initCourseDto', JSON.stringify(initCourseDto));
    return this.courseService.init(initCourseDto);
  }
  @Post('on_init')
  onInit(@Body() onInitCourseDto: OnInitCourseDto) {
    console.log(onInitCourseDto);
    return this.courseService.onInit(onInitCourseDto);
  }
}
