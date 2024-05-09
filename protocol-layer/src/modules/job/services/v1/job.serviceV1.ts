import { BadRequestException, Injectable } from '@nestjs/common';

import { SearchJobDto } from '../../dto/search-job.dto';
import { searchSchema } from '../../schema/v1/search.schema';
import { AxiosService } from 'src/common/axios/axios.service';
import validateJson from 'src/utils/validator';
import { AckNackResponse } from 'src/utils/ack-nack';

@Injectable()
export class JobService {
  constructor(private readonly axiosService: AxiosService) {}

  search(searchJobDto: SearchJobDto) {
    try {
      const isValid = validateJson(searchSchema, {
        context: searchJobDto.context,
        message: searchJobDto.message,
      });
      if (!isValid) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      }
      return new AckNackResponse('ACK');
    } catch (error) {
      throw error;
    }
  }

  async sendSearchRequest(searchJobDto: SearchJobDto) {
    try {
      const searchPayload = {
        context: searchJobDto.context,
        message: searchJobDto.message,
      };

      await this.axiosService.post(
        searchJobDto.gatewayUrl + '/search',
        searchPayload,
      );
    } catch (error) {
      console.log('error===============', error);
      throw error?.response;
    }
  }

  onSearch(searchJobDto: SearchJobDto) {
    try {
      const isValid = validateJson(searchSchema, {
        context: searchJobDto.context,
        message: searchJobDto.message,
      });
      if (isValid !== true) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        return {
          message,
        };
      } else {
        const message = new AckNackResponse('ACK');
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
