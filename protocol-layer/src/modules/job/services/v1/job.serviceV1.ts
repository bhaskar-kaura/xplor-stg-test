import { BadRequestException, Injectable } from '@nestjs/common';

import { SearchJobDto, SelectJobDto } from '../../dto/request-job.dto';
import { searchSchema } from '../../schema/v1/search.schema';
import { AxiosService } from '../../../../common/axios/axios.service';
import validateJson from '../../../../utils/validator';
import { AckNackResponse } from '../../../../utils/ack-nack';
import { ConfigService } from '@nestjs/config';
import {
  ACK,
  Action,
  CONTEXT_ERROR,
  ERROR_CODE_CONTEXT,
  NACK,
} from '../../../../common/constants/action';
import { onSearchSchema } from '../../schema/v1/on-search.schema';

@Injectable()
export class JobService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly configService: ConfigService,
  ) {}

  async search(searchJobDto: SearchJobDto) {
    try {
      const isValid = validateJson(searchSchema, {
        context: searchJobDto.context,
        message: searchJobDto.message,
      });
      console.log('isValid', isValid);
      if (isValid !== true) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      } else {
        const message = new AckNackResponse('ACK');
        await this.sendSearchRequest(searchJobDto);
        return {
          message,
        };
      }
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

      const url = searchJobDto.gatewayUrl + '/search';
      console.log(url);
      const searchResponse = await this.axiosService.post(url, searchPayload);
      console.log('searchRequest=======', searchResponse);
      return searchResponse;
    } catch (error) {
      console.log('error===============', error);
      throw error?.response;
    }
  }

  async onSearch(searchJobDto: SearchJobDto) {
    try {
      const isValid = validateJson(onSearchSchema, {
        context: searchJobDto.context,
        message: searchJobDto.message,
      });
      console.log("Job payload isValid",isValid)
      if (!isValid) {
        const message = new AckNackResponse(
          NACK,
          CONTEXT_ERROR,
          ERROR_CODE_CONTEXT,
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      } else {
        const message = new AckNackResponse(ACK);
        console.log("on_search Job dto",searchJobDto)
        await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_search}`,
          searchJobDto,
        );
        return message;
      }
    } catch (error) {
      throw error;
    }
  }

  async select(selectJobDto: SelectJobDto) {
    try {
      const isValid = validateJson(searchSchema, {
        context: selectJobDto.context,
        message: selectJobDto.message,
      });
      console.log('isValid', isValid);
      if (isValid !== true) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      } else {
        const message = new AckNackResponse('ACK');
        await this.sendSearchRequest(selectJobDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async sendSelectRequest(selectJobDto: SelectJobDto) {
    try {
      const searchPayload = {
        context: selectJobDto.context,
        message: selectJobDto.message,
      };

      const url = selectJobDto.gatewayUrl + '/select';
      console.log(url);
      const searchResponse = await this.axiosService.post(url, searchPayload);
      console.log('selectRequest=======', searchResponse);
      return searchResponse;
    } catch (error) {
      console.log('error===============', error);
      throw error?.response;
    }
  }
}
