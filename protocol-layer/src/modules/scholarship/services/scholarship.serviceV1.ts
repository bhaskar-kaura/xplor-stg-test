import { BadRequestException, Injectable } from '@nestjs/common';
import validateJson from '../../../utils/validater';
import { searchSchema } from '../schema/search.schema';
import { SearchScholarshipDto } from '../dto/search-scholarship.dto';
import { AxiosService } from '../../../common/axios/axios.service';
import { onSearchSchema } from '../schema/onSearch.schema';
import { GrafanaLoggerService } from 'src/services/grafana/service/grafana.service';

@Injectable()
export class ScholarshipService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly loggerService: GrafanaLoggerService,
  ) {}
  search(searchScholarshipDto: SearchScholarshipDto) {
    try {
      const isValid = validateJson(searchSchema, {
        context: searchScholarshipDto.context,
        message: searchScholarshipDto.message,
      });
      if (isValid !== true) throw new BadRequestException(isValid);
      this.sendSearchRequest(searchScholarshipDto);
      return isValid;
    } catch (error) {
      this.loggerService.sendDebug({
        message: error,
        methodName: this.search.name,
      });
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

  on_search(searchScholarshipDto: SearchScholarshipDto) {
    try {
      const isValid = validateJson(onSearchSchema, {
        context: searchScholarshipDto.context,
        message: searchScholarshipDto.message,
      });
      if (isValid !== true) throw new BadRequestException(isValid);
      return isValid;
    } catch (error) {
      this.loggerService.sendDebug({
        message: error,
        methodName: this.on_search.name,
      });
      throw error;
    }
  }
}
