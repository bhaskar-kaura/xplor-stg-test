import { Injectable } from '@nestjs/common';

import { CourseSearchPayload } from '../entity/search.entity';
import { Context } from '../interface/context';
import { ICourseSearch, Message } from '../interface/request/search';
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
export class CourseSearchService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: AxiosService,
  ) {}

  createPayload(context: Context, query: Message) {
    try {
      const contextPayload: Context = {
        ...context,
        bap_id: contextConstant.bap_id,
        bap_uri: contextConstant.bap_uri + `/${xplorDomain.course}`,
        domain: DomainsEnum.COURSE_DOMAIN,
      };
      const message: Message = query;
      const payload = new CourseSearchPayload(contextPayload, message);
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
      const searchPayload: ICourseSearch = this.createPayload(context, query);
      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.course}/${Action.search}`;
      const response = await this.httpService.post(url, searchPayload);
      return response;
    } catch (error) {
      console.log(error?.message);
      return error?.message;
    }
  }
}
