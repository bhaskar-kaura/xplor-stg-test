import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JobSearchPayload } from '../entity/search.entity';
import { Context } from '../interface/context';
import { IJobSearch, Message } from '../interface/request/search';
import { contextConstant } from '../../../../../common/constants/context.constant';
import { AxiosService } from '../../../../../common/axios/axios.service';

import {
  Action,
  DomainsEnum,
  Gateway,
  xplorDomain,
} from '../../../../../common/constants/enums';
@Injectable()
export class JobSearchService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: AxiosService,
  ) {}

  createPayload(context: Context, query: Message) {
    try {
      const contextPayload: Context = {
        ...context,
        bap_id: contextConstant.bap_id,
        bap_uri: contextConstant.bap_uri + `/${xplorDomain.job}`,
        domain: DomainsEnum.COURSE_DOMAIN,
      };
      const message: Message = query;
      const payload = new JobSearchPayload(contextPayload, message);
      return {
        ...payload,
        gatewayUrl: Gateway.course,
      };
    } catch (error) {
      return error?.message;
    }
  }

  async sendSearchPayload(context: Context, query: Message) {
    try {
      const searchPayload: IJobSearch = this.createPayload(context, query);
      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.job}/${Action.search}`;
      const response = await this.httpService.post(url, searchPayload);
      return response;
    } catch (error) {
      console.log(error?.message);
      return error?.message;
    }
  }
}
