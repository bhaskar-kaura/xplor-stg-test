import { BadRequestException, Injectable } from '@nestjs/common';

import { searchSchema } from '../schema/search.schema';
import { SearchScholarshipDto } from '../dto/search-scholarship.dto';
import { AxiosService } from '../../../common/axios/axios.service';
import { GrafanaLoggerService } from 'src/services/grafana/service/grafana.service';
import validateJson from 'src/utils/validator';
import { AckNackResponse } from 'src/utils/ack-nack';
import {
  ACK,
  Action,
  CONTEXT_ERROR,
  ERROR_CODE_CONTEXT,
  NACK,
} from 'src/common/constants/action';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ScholarshipService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly loggerService: GrafanaLoggerService,
    private readonly configService: ConfigService,
  ) {}
  async search(searchScholarshipDto: SearchScholarshipDto) {
    try {
      const isValid = validateJson(searchSchema, {
        context: searchScholarshipDto.context,
        message: searchScholarshipDto.message,
      });
      console.log(isValid)
      if (!isValid) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      }
      this.sendSearchRequest(searchScholarshipDto);
      return new AckNackResponse('ACK');
    } catch (error) {
      throw error;
    }
  }

  private async sendSearchRequest(searchScholarshipDto: SearchScholarshipDto) {
    const searchPayload = {
      context: searchScholarshipDto.context,
      message: searchScholarshipDto.message,
    };
    console.log(searchScholarshipDto.gatewayUrl + '/search',"abhishek",JSON.stringify(searchPayload))
    const result = await this.axiosService.post(
      searchScholarshipDto.gatewayUrl + '/search',
      searchPayload,
    );
    return result;
  }

  async on_search(searchScholarshipDto: SearchScholarshipDto) {
    try {
      const isValid = validateJson(searchSchema, {
        context: searchScholarshipDto.context,
        message: searchScholarshipDto.message,
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
          searchScholarshipDto,
        );
        return message;
      }
    } catch (error) {
      this.loggerService.sendDebug({
        message: error,
        methodName: this.on_search.name,
      });
      throw error;
    }
  }
}
