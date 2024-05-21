import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosService } from '../.../../../../common/axios/axios.service';

import { searchSchema } from '../schema/search.schema';
import {
  InitCourseDto,
  OnInitCourseDto,
  OnSelectCourseDto,
  SearchCourseDto,
  SelectCourseDto,
} from '../dto/request-course.dto';
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
import { onSearchSchema } from '../schema/onSearch.schema';
import { selectSchema } from '../schema/select.schema';
import { onSelectSchema } from '../schema/onSelect.schema';
import { onInitSchema } from '../schema/onInit.schema';
@Injectable()
export class CourseService {
  constructor(
    private readonly configService: ConfigService,
    private readonly axiosService: AxiosService,
    private readonly httpService: HttpService,
  ) {}
  search(searchCourseDto: SearchCourseDto) {
    try {
      console.log('searchCourseDto', searchCourseDto);
      const isValid = validateJson(searchSchema, {
        context: searchCourseDto.context,
        message: searchCourseDto.message,
      });
      console.log('searchCourseDto', searchCourseDto);
      if (!isValid) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      }
      this.sendSearchRequest(searchCourseDto);
      return new AckNackResponse('ACK');
    } catch (error) {
      throw error;
    }
  }

  async onSearch(searchCourseDto: SearchCourseDto) {
    try {
      console.log('courseOnSearchResponse', searchCourseDto);
      const isValid = validateJson(onSearchSchema, {
        context: searchCourseDto.context,
        message: searchCourseDto.message,
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
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_search}`,
          searchCourseDto,
        );
        console.log('response', response);
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
    console.log();
    const result = await this.axiosService.post(
      searchCourseDto.gatewayUrl + '/search',
      searchPayload,
    );
    return result;
  }

  async select(selectCourseDto: SelectCourseDto) {
    try {
      const isValid = validateJson(selectSchema, {
        context: selectCourseDto.context,
        message: selectCourseDto.message,
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
        await this.sendSelectRequest(selectCourseDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async init(initCourseDto: InitCourseDto) {
    try {
      const isValid = validateJson(selectSchema, {
        context: initCourseDto.context,
        message: initCourseDto.message,
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
        await this.sendInitRequest(initCourseDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async onInit(onInitCourseDto: OnInitCourseDto) {
    try {
      console.log('onInitCourseDto', onInitCourseDto);
      const isValid = validateJson(onInitSchema, {
        context: onInitCourseDto.context,
        message: onInitCourseDto.message,
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
          onInitCourseDto,
        );
        return response;
      }
    } catch (error) {
      throw error;
    }
  }
  private async sendInitRequest(initCourseDto: InitCourseDto) {
    try {
      const selectPayload = {
        context: initCourseDto.context,
        message: initCourseDto.message,
      };

      const url = initCourseDto.context.bpp_uri + `/${Action.init}`;
      console.log(url);
      const selectResponse = await this.axiosService.post(url, selectPayload);
      console.log('selectRequest=======', selectResponse);
      return selectResponse;
    } catch (error) {
      console.log('error===============', error);
      throw error?.response;
    }
  }

  async onSelect(onSelectCourseDto: OnSelectCourseDto) {
    try {
      console.log('courseOnSearchResponse', onSelectCourseDto);
      const isValid = validateJson(onSelectSchema, {
        context: onSelectCourseDto.context,
        message: onSelectCourseDto.message,
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
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_select}`,
          onSelectCourseDto,
        );
        console.log('response', response);
        return message;
      }
    } catch (error) {
      throw error;
    }
  }

  private async sendSelectRequest(selectCourseDto: SelectCourseDto) {
    try {
      const selectPayload = {
        context: selectCourseDto.context,
        message: selectCourseDto.message,
      };

      const url = selectCourseDto.context.bpp_uri + `/${Action.select}`;
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
