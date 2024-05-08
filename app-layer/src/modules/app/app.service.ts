import { Injectable } from '@nestjs/common';
import { SearchRequestDto } from './dto/search-request.dto';
import { AxiosService } from 'src/common/axios/axios.service';
import { CreateSearchRequestBody } from 'src/util/course/search-request.mapper';
import { ConfigService } from '@nestjs/config';
import { OndcContext, OnestContext } from 'src/util/context.builder';
import { Gateway } from 'src/common/constants/enums';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly axiosService: AxiosService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async search(searchRequest: SearchRequestDto) {
    try {
      const protocolSearchBody = CreateSearchRequestBody(
        searchRequest.context.bap_id,
        searchRequest.context.bap_uri,
        searchRequest.context.transaction_id,
        searchRequest.context.message_id,
        searchRequest.context.search_query,
        searchRequest.context.country,
        searchRequest.context.city,
      );

      console.log('searchRequest', {
        gatewayUrl: Gateway.course,
        protocolSearchBody,
      });
      const protocolResponse = await this.axiosService.post(
        this.configService.get('PROTOCOL_SERVICE_URL') + '/course/search',
        { gatewayUrl: Gateway.course, ...protocolSearchBody },
      );

      console.log('protocolResponse', protocolResponse);

      return protocolResponse;
    } catch (error) {
      console.log('error=======', JSON.stringify(error?.response?.data));
      throw error?.response;
    }
  }

  async onSearch(response: OnestContext | OndcContext | any) {
    console.log(
      `response ${response?.context?.domain}`,
      JSON.stringify(response),
    );
  }
}
