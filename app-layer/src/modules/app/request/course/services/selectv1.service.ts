import { Injectable } from '@nestjs/common';

import { CourseSelectPayload } from '../entity/select.enytity';
import { Context } from '../interface/context';
import { ICourseSelect, IMessageSelect as Message } from '../interface/request/Select';
import { OnestContextConstants } from 'src/common/constants/context.constant';
import { AxiosService } from 'src/common/axios/axios.service';
import { ConfigService } from '@nestjs/config';
import {
  Action,
  DomainsEnum,
  Gateway,
  xplorDomain,
} from 'src/common/constants/enums';

/**
 * Service for handling course Select operations.
 * This service is responsible for creating and sending Select payloads for course-related queries.
 */
@Injectable()
export class CourseSelectService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: AxiosService,
  ) {}

  /**
   * Creates a payload for a course Select operation.
   * This method constructs a CourseSelectPayload object with the necessary context and query information.
   * @param context The context in which the Select is performed.
   * @param query The query parameters for the Select.
   * @returns The constructed payload.
   */
  createPayload(context: Context, query: Message) {
    try {
      const contextPayload: Context = {
        ...context,
        bap_id: OnestContextConstants.bap_id,
        bap_uri:
          this.configService.get('PROTOCOL_SERVICE_URL') +
          `/${xplorDomain.course}`,
        domain: DomainsEnum.COURSE_DOMAIN,
      };
      const message: Message = query;
      const payload = new CourseSelectPayload(contextPayload, message);
      return {
        ...payload,
        gatewayUrl: Gateway.course,
      };
    } catch (error) {
      return error?.message;
    }
  }

  /**
   * Sends a Select payload to the appropriate service.
   * This method sends the constructed payload to the service endpoint and returns the response.
   * @param context The context in which the Select is performed.
   * @param query The query parameters for the Select.
   * @returns The response from the service.
   */
  async sendSelectPayload(context: Context, query: Message) {
    try {
      const SelectPayload: ICourseSelect = this.createPayload(context, query);

      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.course}/${Action.Select}`;

      const response = await this.httpService.post(url, SelectPayload);
      return response;
    } catch (error) {
      console.log(error);
      return error?.message;
    }
  }
}
