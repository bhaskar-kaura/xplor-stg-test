import { BadRequestException, Injectable } from '@nestjs/common';
import { SearchRetailDto } from '../dto/search-retail.dto';
import { searchSchema } from '../schema/search.schema';
import { AckNackResponse } from 'src/utils/ack-nack';
import validateJson from 'src/utils/validator';
import { ConfigService } from '@nestjs/config';
import { AxiosService } from 'src/common/axios/axios.service';
import { onSearchSchema } from '../schema/onSearch.schema';

@Injectable()
export class RetailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly axiosService: AxiosService,
  ) {}
  search(searchRetailDto: SearchRetailDto) {
    try {
      console.log('searchRetailDto', searchRetailDto);
      const isValid = validateJson(searchSchema, {
        context: searchRetailDto.context,
        message: searchRetailDto.message,
      });
      if (!isValid) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        throw new BadRequestException(message);
      }
      this.sendSearchRequest(searchRetailDto);
      return new AckNackResponse('ACK');
    } catch (error) {
      throw error;
    }
  }

  async onSearch(searchRetailDto: SearchRetailDto) {
    try {
      const isValid = validateJson(onSearchSchema, {
        context: searchRetailDto.context,
        message: searchRetailDto.message,
      });
      if (!isValid) {
        const message = new AckNackResponse(
          'NACK',
          'CONTEXT_ERROR',
          '625519',
          isValid as unknown as string,
        );
        return message;
      } else {
        console.log(
          'this.configService.get(',
          this.configService.get('APP_SERVICE_URL'),
        );
        const message = new AckNackResponse('ACK');
        await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + '/on_search',
          searchRetailDto,
        );
        return message;
      }
    } catch (error) {
      throw error;
    }
  }

  private async sendSearchRequest(searchRetailDto: SearchRetailDto) {
    const searchPayload = {
      context: searchRetailDto.context,
      message: searchRetailDto.message,
    };
    const result = await this.axiosService.post(
      searchRetailDto.gatewayUrl + '/search',
      searchPayload,
    );
    console.log('result', result);
    return result;
  }
}
