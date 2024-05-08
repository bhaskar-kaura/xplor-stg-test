import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchRequestDto } from './dto/search-request.dto';
import { OndcContext, OnestContext } from 'src/util/context.builder';

@Controller({ version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('search')
  search(@Body() searchRequest: SearchRequestDto) {
    return this.appService.search(searchRequest);
  }

  @Post('on_search')
  onSearch(@Body() searchResponse: OndcContext | OnestContext | any) {
    return this.appService.onSearch(searchResponse);
  }
}
