import { Injectable } from '@nestjs/common';
import { Catalog, MessageResponse, Provider } from './interface/on-search';

/**
 * Service for handling job response operations.
 * This service is responsible for creating a payload from a message response.
 */
@Injectable()
export class RetailResponseService {
  constructor() {}

  /**
   * Creates a payload from a given message response.
   * This method constructs a MessageResponse object based on the input response, which can be of type MessageResponse or any other type.
   * It extracts and structures the catalog data from the response.
   * @param response The input response to process.
   * @returns The constructed MessageResponse object.
   */
  createPayload(response: MessageResponse | any) {
    try {
      const catalog: Catalog = {
        providers:
          response?.catalog != null ? response?.catalog['bpp/providers'] : [],
        descriptor:
          response?.catalog != null ? response?.catalog['bpp/descriptor'] : {},
        fulfillments:
          response?.catalog != null
            ? response?.catalog['bpp/fulfillments']
            : {},
      };
      const resp: MessageResponse = {
        message: {
          catalog: catalog,
        },
      };
      catalog.providers.map((data: Provider) => {
        console.log('provider', JSON.stringify(data));
        data.items.map((item) => {
          console.log('item', JSON.stringify(item));
          console.log('item.price', item.price);
        });
      });
      return resp;
    } catch (error) {
      console.log(error);
      return error?.message;
    }
  }
}
