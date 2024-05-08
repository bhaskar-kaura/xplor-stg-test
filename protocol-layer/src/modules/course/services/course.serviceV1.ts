import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosService } from 'src/common/axios/axios.service';

import { searchSchema } from '../schema/search.schema';
import { SearchCourseDto } from '../dto/search-course.dto';
import validateJson from 'src/utils/validator';
import { AckNackResponse } from 'src/utils/ack-nack';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class CourseService {
  constructor(
    private readonly configService: ConfigService,
    private readonly axiosService: AxiosService,
    private readonly httpService: HttpService,
  ) {}
  search(searchCourseDto: SearchCourseDto) {
    try {
      const isValid = validateJson(searchSchema, {
        context: searchCourseDto.context,
        message: searchCourseDto.message,
      });
      if (!isValid) throw new BadRequestException(isValid);
      this.sendSearchRequest(searchCourseDto);
      return {
        success: true,
        data: {
          status: 'ACK',
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async onSearch(searchCourseDto: SearchCourseDto) {
    try {
      const isValid = validateJson(searchSchema, {
        context: searchCourseDto.context,
        message: searchCourseDto.message,
      });
      if (!isValid) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        return message;
      } else {
        console.log(
          'this.configService.get(',
          this.configService.get('APP_SERVICE_URL'),
        );
        const message = new AckNackResponse('ACK');
        await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + '/on_search',
          searchCourseDto,
        );
        return message;
      }
    } catch (error) {
      throw error;
    }
  }

  private async sendSearchRequest(searchCourseDto: SearchCourseDto) {
    const searchPayload = {
      context: searchCourseDto.context,
      message: searchCourseDto.message,
    };
    const result = await this.axiosService.post(
      searchCourseDto.gatewayUrl + '/search',
      searchPayload,
    );
    console.log('result', result);
    return result;
  }
}
