import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateScholarshipDto } from '../dto/update-scholarship.dto';
import { searchSchema } from '../schema/search.schema';
import { SearchScholarshipDto } from '../dto/search-scholarship.dto';
import { AxiosService } from '../../../common/axios/axios.service';
import { onSearchSchema } from '../schema/onSearch.schema';
import { GrafanaLoggerService } from 'src/services/grafana/service/grafana.service';
import validateJson from 'src/utils/validator';
import { AckNackResponse } from 'src/utils/ack-nack';
import { ACK, Action, CONTEXT_ERROR, ERROR_CODE_CONTEXT, NACK } from 'src/common/constants/action';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ScholarshipService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly loggerService: GrafanaLoggerService,
    private readonly configService: ConfigService
  ) {}
  async search(searchScholarshipDto: SearchScholarshipDto) {
    try {
   
      const isValid = validateJson(searchSchema, {
        context: searchScholarshipDto.context,
        message: searchScholarshipDto.message,
      });
      console.log('isValid', isValid);
      if (isValid !== true) {
        const message= new AckNackResponse("NACK","CONTEXT_ERROR","625519",isValid as unknown as string)
        return {
          message
        }
      }
      else {
        const message= new AckNackResponse("ACK")
        const searchResponse = await this.sendSearchRequest(searchScholarshipDto);
        console.log(searchResponse)
        return {
       message
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async sendSearchRequest(searchScholarshipDto: SearchScholarshipDto) {
    try {
      const searchPayload = {
        context: searchScholarshipDto.context,
        message: searchScholarshipDto.message,
      };
      await this.axiosService.post(
        searchScholarshipDto.gatewayUrl + '/search',
        searchPayload,
      );
    } catch (error) {
      this.loggerService.sendDebug({
        message: error,
        methodName: this.sendSearchRequest.name,
      });
      throw error;
    }
  }

  async on_search(searchScholarshipDto: SearchScholarshipDto) {
    try {
      const isValid = validateJson(searchSchema, {
        context: searchScholarshipDto.context,
        message: searchScholarshipDto.message,
      });
      if (!isValid) {
        const message = new AckNackResponse(
         NACK,
          CONTEXT_ERROR,
          ERROR_CODE_CONTEXT,
          isValid as unknown as string,
        );
        return message;
      } else {
        const message = new AckNackResponse(ACK);
        await this.axiosService.post(
          this.configService.get('APP_SERVICE_URL') + `/${Action.on_search}`,
          searchScholarshipDto,
        );
        return message;
      }
    } catch (error) {
      this.loggerService.sendDebug({
        message: error,
        methodName: this.on_search.name,
      });
      throw error;
    } 
  }
}
