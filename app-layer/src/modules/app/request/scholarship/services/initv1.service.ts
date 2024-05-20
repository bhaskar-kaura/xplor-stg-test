import { Injectable } from '@nestjs/common';

import { OnestContextConstants } from 'src/common/constants/context.constant';
import { AxiosService } from 'src/common/axios/axios.service';
import { ConfigService } from '@nestjs/config';
import {
  Action,
  DomainsEnum,
  Gateway,
  xplorDomain,
} from 'src/common/constants/enums';
import { DumpService } from 'src/modules/dump/service/dump.service';
import { InitRequestDto } from 'src/modules/app/dto/init-request.dto';
import { IMessageInit } from '../interface/request/init';
import { SelectContext } from '../../course/interface/context';

@Injectable()
export class ScholarshipInitService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: AxiosService,
    private readonly dbService: DumpService,
  ) {}

  async createPayload(request: InitRequestDto) {
    try {
      const selectRequestDetails =
        await this.dbService.findByActionTransactionId(
          request?.context?.transaction_id,
          request?.context?.domain,
          'select',
        );
      const context = selectRequestDetails.context as unknown as SelectContext;
      const contextPayload: SelectContext = {
        ...context,
        action: Action.select,
        domain: DomainsEnum.SCHOLARSHIP_DOMAIN,
        message_id: request.context.message_id,
        version: OnestContextConstants.version,
        timestamp: new Date().toISOString(),
        ttl: request.context.ttl
          ? request.context.ttl
          : OnestContextConstants.ttl,
      };
      const messagePayload: IMessageInit = {
        order: {
          provider: {
            id: selectRequestDetails?.message?.order.provider_id,
          },
          items: [
            { id: selectRequestDetails?.message?.order.items_id[0] },
            ...selectRequestDetails?.message?.order.itemsId
              .slice(1)
              .map((id) => ({ id })),
          ],
          billing: request.message.order.billing,
          fulfillments: [
            {
              customer: {
                person: {
                  name: request.message.order.billing.name,
                  age: request.message.order.billing.age,
                  gender: request.message.order.billing.gender,
                  tags: [],
                },
                contact: {
                  phone: request.message.order.billing.phone,
                  email: request.message.order.billing.email,
                },
              },
            },
          ],
        },
      };

      const payload = {
        context: contextPayload,
        message: messagePayload,
      };
      return {
        ...payload,
        gatewayUrl: Gateway.scholarship,
      };
    } catch (error) {
      return error?.message;
    }
  }

  async sendInitPayload(request: InitRequestDto) {
    try {
      const initPayload = await this.createPayload(request);
      const url =
        this.configService.get('PROTOCOL_SERVICE_URL') +
        `/${xplorDomain.scholarship}/${Action.init}`;

      const response = await this.httpService.post(url, initPayload);
      console.log('initPayload', JSON.stringify(initPayload));
      return response;
    } catch (error) {
      console.log(error);
      return error?.message;
    }
  }
}
