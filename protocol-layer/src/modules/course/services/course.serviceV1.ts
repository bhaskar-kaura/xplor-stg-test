import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosService } from 'src/common/axios/axios.service';
import validateJson from 'src/utils/validater';
import { searchSchema } from '../schema/search.schema';
import { SearchCourseDto } from '../dto/search-course.dto';
@Injectable()
export class CourseService {
  constructor(
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
      if (!isValid) throw new BadRequestException(isValid);
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

  private async sendSearchRequest(searchCourseDto: SearchCourseDto) {
    const searchPayload = {
      context: searchCourseDto.context,
      message: searchCourseDto.message,
    };
    console.log('searchCourseDto', searchCourseDto);
    console.log(
      'searchCourseDto.gatewayUrl ',
      searchCourseDto.gatewayUrl + '/search',
    );
    const result = await this.axiosService.post(
      searchCourseDto.gatewayUrl + '/search',
      searchPayload,
    );
    return result;
  }
}
