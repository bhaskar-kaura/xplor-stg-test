import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosService } from '../.../../../../common/axios/axios.service';

import { searchSchema } from '../schema/search.schema';
import {
  ConfirmCourseDto,
  InitCourseDto,
  OnConfirmCourseDto,
  OnInitCourseDto,
  OnSelectCourseDto,
  OnStatusCourseDto,
  SearchCourseDto,
  SelectCourseDto,
  StatusCourseDto,
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
import { initSchema } from '../schema/init.schema';
import { confirmSchema } from '../schema/confirm.schema';
import { onConfirmSchema } from '../schema/onConfirm.schema';
import { statusSchema } from '../schema/status.schema';
import { onStatusSchema } from '../schema/onStatus.schema';
import {
  courseConfirmResponse,
  courseInitResponse,
  courseSelectResponse,
  courseStatusResponse,
} from 'src/utils/mock-response';
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
      const isNetworkMock = this.configService.get('IS_NETWORK_MOCK');
      console.log('IS_NETWORK_MOCK', isNetworkMock);
      if (isNetworkMock) {
        this.mockSelectResponse(
          selectPayload.context.transaction_id,
          selectPayload.context.bap_uri,
        );
      }
      return selectResponse;
    } catch (error) {
      console.log('error===============', error);
      throw error?.response;
    }
  }

  async init(initCourseDto: InitCourseDto) {
    try {
      const isValid = validateJson(initSchema, {
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
        console.log('initCourseDto', initCourseDto);
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
        await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_init}`,
          onInitCourseDto,
        );
        return message;
      }
    } catch (error) {
      throw error;
    }
  }
  private async sendInitRequest(initCourseDto: InitCourseDto) {
    try {
      const initPayload = {
        context: initCourseDto.context,
        message: initCourseDto.message,
      };

      const env = this.configService.get('NODE_ENV');
      const url =
        env === 'development'
          ? initCourseDto.gatewayUrl + `/${Action.init}`
          : initPayload.context.bpp_id + `${Action.init}`;
      const initResponse = await this.axiosService.post(url, initPayload);
      console.log('initResponse', initResponse);
      console.log('initRequest=======', initResponse);
      const isNetworkMock = this.configService.get('IS_NETWORK_MOCK');
      console.log('IS_NETWORK_MOCK', isNetworkMock);
      if (isNetworkMock) {
        this.mockInitResponse(
          initPayload.context.transaction_id,
          initPayload.context.bap_uri,
        );
      }
      return initResponse;
    } catch (error) {
      console.log('error===============', error);
      throw error?.response;
    }
  }

  async confirm(confirmCourseDto: ConfirmCourseDto) {
    try {
      const isValid = validateJson(confirmSchema, {
        context: confirmCourseDto.context,
        message: confirmCourseDto.message,
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
        console.log('confirmCourseDto', confirmCourseDto);
        await this.sendConfirmRequest(confirmCourseDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async onConfirm(onConfirmCourseDto: OnConfirmCourseDto) {
    try {
      console.log('onConfirmCourseDto', onConfirmCourseDto);
      const isValid = validateJson(onConfirmSchema, {
        context: onConfirmCourseDto.context,
        message: onConfirmCourseDto.message,
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
        await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_confirm}`,
          onConfirmCourseDto,
        );
        return message;
      }
    } catch (error) {
      throw error;
    }
  }

  private async sendConfirmRequest(confirmCourseDto: ConfirmCourseDto) {
    try {
      const confirmPayload = {
        context: confirmCourseDto.context,
        message: confirmCourseDto.message,
      };
      console.log('confirmPayload', JSON.stringify(confirmPayload));
      const env = this.configService.get('NODE_ENV');
      const url =
        env === 'development'
          ? confirmCourseDto.gatewayUrl + `/${Action.confirm}`
          : confirmPayload.context.bpp_id + `${Action.confirm}`;
      const selectResponse = await this.axiosService.post(url, confirmPayload);
      console.log('confirmRequest=======', selectResponse);
      const isNetworkMock = this.configService.get('IS_NETWORK_MOCK');
      console.log('IS_NETWORK_MOCK', isNetworkMock);
      if (isNetworkMock) {
        this.mockConfirmResponse(
          confirmPayload.context.transaction_id,
          confirmPayload.context.bap_uri,
        );
      }
      return selectResponse;
    } catch (error) {
      console.log('error===============', error);
      throw error?.response;
    }
  }

  async status(statusCourseDto: StatusCourseDto) {
    try {
      const isValid = validateJson(statusSchema, {
        context: statusCourseDto.context,
        message: statusCourseDto.message,
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
        console.log('statusCourseDto', statusCourseDto);
        await this.sendStatusRequest(statusCourseDto);
        return {
          message,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async mockInitResponse(transaction_id: string, baseUrl: string) {
    const url = baseUrl + '/' + Action.on_init;
    const mockRequest = await this.axiosService.post(
      url,
      courseInitResponse(transaction_id),
    );
    console.log('mockRequest', mockRequest);
  }

  async mockSelectResponse(transaction_id: string, baseUrl: string) {
    const url = baseUrl + '/' + Action.on_select;
    const mockRequest = await this.axiosService.post(
      url,
      courseSelectResponse(transaction_id),
    );
    console.log('mockRequest', mockRequest);
  }

  async mockConfirmResponse(transaction_id: string, baseUrl) {
    const url = baseUrl + '/' + Action.on_confirm;
    const mockRequest = await this.axiosService.post(
      url,
      courseConfirmResponse(transaction_id),
    );
    console.log('mockRequest', mockRequest);
  }

  async mockStatusResponse(transaction_id: string, baseUrl) {
    const url = baseUrl + '/' + Action.on_status;
    const mockRequest = await this.axiosService.post(
      url,
      courseStatusResponse(transaction_id),
    );
    console.log('mockRequest', mockRequest);
  }

  async onStatus(onStatusCourseDto: OnStatusCourseDto) {
    try {
      console.log('onStatusCourseDto', onStatusCourseDto);
      const isValid = validateJson(onStatusSchema, {
        context: onStatusCourseDto.context,
        message: onStatusCourseDto.message,
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
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_status}`,
          onStatusCourseDto,
        );
        return response;
      }
    } catch (error) {
      throw error;
    }
  }
  private async sendStatusRequest(statusCourseDto: StatusCourseDto) {
    try {
      const statusPayload = {
        context: statusCourseDto.context,
        message: statusCourseDto.message,
      };

      const env = this.configService.get('NODE_ENV');
      const url =
        env === 'development'
          ? statusCourseDto.gatewayUrl + `/${Action.status}`
          : statusCourseDto.context.bpp_id + `${Action.status}`;
      const statusResponse = await this.axiosService.post(url, statusPayload);
      console.log('statusResponse', statusResponse);
      console.log('statusRequest=======', statusResponse);
      const isNetworkMock = this.configService.get('IS_NETWORK_MOCK');
      console.log('IS_NETWORK_MOCK', isNetworkMock);
      if (isNetworkMock) {
        this.mockStatusResponse(
          statusPayload.context.transaction_id,
          statusPayload.context.bap_uri,
        );
      }
      return statusResponse;
    } catch (error) {
      console.log('error===============', error);
      throw error?.response;
    }
  }
}
