import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosService } from '../.../../../../common/axios/axios.service';

import { searchSchema } from '../schema/search.schema';
import { SearchCourseDto } from '../dto/search-course.dto';
import validateJson from '../.../../../../utils/validator';
import { AckNackResponse } from '../.../../../../utils/ack-nack';
import { ConfigService } from '@nestjs/config';
import {
  ACK,
  Action,
  CONTEXT_ERROR,
  ERROR_CODE_CONTEXT,
  NACK,
} from '../.../../../../common/constants/action';
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
          NACK,
          CONTEXT_ERROR,
          ERROR_CODE_CONTEXT,
          isValid as unknown as string,
        );
        return message;
      } else {
        const message = new AckNackResponse(ACK);
        await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_search}`,
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
    return result;
  }
}
