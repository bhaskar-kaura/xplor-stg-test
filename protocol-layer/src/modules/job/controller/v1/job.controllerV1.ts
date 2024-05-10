import { Controller, Post, Body } from '@nestjs/common';
import { JobService } from '../../services/v1/job.serviceV1';
import { SearchJobDto } from '../../dto/search-job.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('/search')
  search(@Body() searchJobDto: SearchJobDto) {
    console.log(searchJobDto);
    return this.jobService.search(searchJobDto);
  }
  @Post('/on_search')
  OnSearch(@Body() searchJobDto: SearchJobDto) {
    console.log(searchJobDto);
    return this.jobService.onSearch(searchJobDto);
  }
}
