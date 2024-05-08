import { Injectable } from '@nestjs/common';
import { SearchRequestDto } from './dto/search-request.dto';
import { AxiosService } from 'src/common/axios/axios.service';

@Injectable()
export class AppService {
  constructor(private readonly axiosService: AxiosService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async search(searchRequest: SearchRequestDto) {}
}
