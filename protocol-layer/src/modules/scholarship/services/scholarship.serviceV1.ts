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
import { onSearchSchema } from '../schema/onSearch.schema';
import { selectSchema } from '../schema/select.schema';
import {
  InitScholarshipDto,
  OnInitScholarshipDto,
  SelectScholarshipDto,
} from '../dto/request-scholarship.dtp';
import { onInitSchema } from '../schema/onInit.schema';
import { initSchema } from '../schema/init.schema';

@Injectable()
export class ScholarshipService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly loggerService: GrafanaLoggerService,
    private readonly configService: ConfigService,
  ) {}
  async search(searchScholarshipDto: SearchScholarshipDto) {
    try {
      console.log(
        JSON.stringify(searchScholarshipDto.message),
        'search_scholarship_dto',
      );
      const isValid = validateJson(searchSchema, {
        context: searchScholarshipDto.context,
        message: searchScholarshipDto.message,
      });
      console.log(isValid);
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
    console.log(searchScholarshipDto.gatewayUrl, 'gatewayUrl');
    const result = await this.axiosService.post(
      searchScholarshipDto.gatewayUrl + '/search',
      searchPayload,
    );
    console.log(result, 'scholarshipGatewayResult');
    return result;
  }

  async on_search(searchScholarshipDto: SearchScholarshipDto) {
    try {
      const isValid = validateJson(onSearchSchema, {
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

  async select(selectScholarshipDto: SelectScholarshipDto) {
    try {
      const isValid = validateJson(selectSchema, {
        context: selectScholarshipDto.context,
        message: selectScholarshipDto.message,
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
        await this.sendSelectRequest(selectScholarshipDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async sendSelectRequest(selectScholarshipDto: SelectScholarshipDto) {
    try {
      const selectPayload = {
        context: selectScholarshipDto.context,
        message: selectScholarshipDto.message,
      };
      const env = this.configService.get('NODE_ENV');
      const url =
        env === 'development'
          ? selectScholarshipDto.gatewayUrl + `/${Action.select}`
          : selectPayload.context.bpp_id + `${Action.select}`;
      const selectResponse = await this.axiosService.post(url, selectPayload);
      console.log('selectRequest=======', selectResponse);
      return selectResponse;
    } catch (error) {
      console.log('error===============', error);
      throw error?.response;
    }
  }

  async init(initScholarshipDto: InitScholarshipDto) {
    try {
      const isValid = validateJson(initSchema, {
        context: initScholarshipDto.context,
        message: initScholarshipDto.message,
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
        await this.sendInitRequest(initScholarshipDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async onInit(onInitScholarshipDto: OnInitScholarshipDto) {
    try {
      console.log('onInitScholarshipDto', onInitScholarshipDto);
      const isValid = validateJson(onInitSchema, {
        context: onInitScholarshipDto.context,
        message: onInitScholarshipDto.message,
      });
      console.log(isValid);
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
        const response = await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_init}`,
          onInitScholarshipDto,
        );
        return response;
      }
    } catch (error) {
      throw error;
    }
  }
  private async sendInitRequest(initScholarshipDto: InitScholarshipDto) {
    try {
      const selectPayload = {
        context: initScholarshipDto.context,
        message: initScholarshipDto.message,
      };

      const url = initScholarshipDto.context.bpp_uri + `/${Action.init}`;
      console.log(url);
      const selectResponse = await this.axiosService.post(url, selectPayload);
      console.log('selectRequest=======', selectResponse);
      return selectResponse;
    } catch (error) {
      console.log('error===============', error);
      throw error?.response;
    }
  }
}
