import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchRequestDto } from './dto/search-request.dto';

@Controller({ version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('search')
  search(searchRequest: SearchRequestDto) {
    return this.appService.search(searchRequest);
  }
}
