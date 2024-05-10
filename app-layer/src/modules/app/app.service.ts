import { BadGatewayException, Injectable } from '@nestjs/common';
import { SearchRequestDto } from './dto/search-request.dto';

import { OndcContext, OnestContext } from 'src/util/context.builder';
import { GlobalActionService } from 'src/common/action/global-action';

import { JobResponseService } from './response/job/job-response.service';
import { DomainsEnum } from 'src/common/constants/enums';
import { AxiosService } from 'src/common/axios/axios.service';
import { ConfigService } from '@nestjs/config';
import { getResponse } from 'src/util/response';
import { coreResponseMessage } from 'src/common/constants/http-response-message';

@Injectable()
export class AppService {
  constructor(
    private readonly globalActionService: GlobalActionService,
    private createPayload: JobResponseService,
    private readonly httpService: AxiosService,
    private readonly configService: ConfigService,
  ) {
    this.configService = new ConfigService();
  }
  getHello(): string {
    return 'Hello World!';
  }

  async search(searchRequest: SearchRequestDto) {
    try {
      await this.globalActionService.globalSearch(
        searchRequest.domain,
        searchRequest.context,
        searchRequest.message,
      );
      return getResponse(
        true,
        coreResponseMessage.searchSuccessResponse,
        null,
        null,
      );
    } catch (error) {
      console.log(JSON.stringify(error?.response?.data));
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }
  async onSearch(response: OnestContext | OndcContext | any) {
    try {
      await this.sendSearch(response);
    } catch (error) {
      console.log(error?.response);
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  async sendSearch(response: SearchRequestDto) {
    try {
      let job: object, course: object, scholarship: object;
      switch (response.context.domain) {
        case DomainsEnum.JOB_DOMAIN:
          job = response.message
            ? this.createPayload.createPayload(response.message)
            : {};
          break;
        case DomainsEnum.COURSE_DOMAIN:
          course = response.message
            ? this.createPayload.createPayload(response.message)
            : {};
          break;
        case DomainsEnum.SCHOLARSHIP_DOMAIN:
          scholarship = response.message
            ? this.createPayload.createPayload(response.message)
            : {};
          break;
        default:
          break;
      }
      const payload = {
        context: response.context,
        data: {
          job: job != null ? job : {},
          course: course != null ? course : {},
          scholarship: scholarship != null ? scholarship : {},
        },
      };
      console.log(JSON.stringify(payload.data.course));
      const url = this.configService.get('CORE_SERVICE_URL') + '/stg/on_search';
      const resp = await this.httpService.post(url, payload);
      console.log('resp', resp);
    } catch (error) {
      console.log(error?.message);
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }
}
