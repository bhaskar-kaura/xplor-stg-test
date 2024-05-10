import { Injectable } from '@nestjs/common';

import { Catalog, MessageResponse, Provider } from './interface/on-search';

@Injectable()
export class JobResponseService {
  constructor() {}

  createPayload(response: MessageResponse | any) {
    try {
      {
        const catalog: Catalog = {
          providers: response?.catalog?.providers.map((data: Provider) => {
            return {
              id: data?.id,
              descriptor: data?.descriptor,
              categories: data?.categories.map((data) => {
                return {
                  id: data.id,
                  descriptor: {
                    name: data.descriptor.name,
                  },
                };
              }),
              items: data?.items,
              fulfillments: data?.fulfillments,
              locations: data?.locations,
            };
          }),
          descriptor: {
            name: response?.catalog?.descriptor?.name,
          },
        };
        const resp: MessageResponse = {
          message: {
            catalog: catalog,
          },
        };
        return resp;
      }
    } catch (error) {
      console.log(error);
      return error?.message;
    }
  }
}
