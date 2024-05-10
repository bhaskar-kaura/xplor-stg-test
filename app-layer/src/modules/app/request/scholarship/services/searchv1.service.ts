import { Injectable } from '@nestjs/common';

import { ScholarshipSearchPayload } from '../entity/search.entity';
import { Context } from '../interface/context';
import { IScholarshipSearch, Message } from '../interface/request/search';
import { contextConstant } from 'src/common/constants/context.constant';
import { AxiosService } from 'src/common/axios/axios.service';
import { ConfigService } from '@nestjs/config';
import {
  Action,
  DomainsEnum,
  Gateway,
  xplorDomain,
} from 'src/common/constants/enums';
@Injectable()
export class ScholarshipSearchService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: AxiosService,
  ) {}

  createPayload(context: Context, query: Message) {
    try {
      const contextPayload: Context = {
        ...context,
        bap_id: contextConstant.bap_id,
        bap_uri: contextConstant.bap_uri + `/${xplorDomain.scholarship}`,
        domain: DomainsEnum.SCHOLARSHIP_DOMAIN,
      };
      const message: Message = query;
      const payload = new ScholarshipSearchPayload(contextPayload, message);
      return {
        ...payload,
        gatewayUrl: Gateway.scholarship,
      };
    } catch (error) {
      return error?.message;
    }
  }

  async sendSearchPayload(context: Context, query: Message) {
    try {
      const searchPayload: IScholarshipSearch = this.createPayload(
        context,
        query,
      );
      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.scholarship}/${Action.search}`;
      const response = await this.httpService.post(url, searchPayload);
      return response;
    } catch (error) {
      console.log(error?.message);
      return error?.message;
    }
  }
}
