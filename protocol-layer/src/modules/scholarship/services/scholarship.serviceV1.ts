import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateScholarshipDto } from '../dto/update-scholarship.dto';
import validateJson from '../../../utils/validater';
import { searchSchema } from '../schema/search.schema';
import { SearchScholarshipDto } from '../dto/search-scholarship.dto';
import { AxiosService } from '../../../common/axios/axios.service';
import { HttpService } from '@nestjs/axios';
import { onSearchSchema } from '../schema/onSearch.schema';

@Injectable()
export class ScholarshipService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly httpService: HttpService,
  ) {}
  search(searchScholarshipDto: SearchScholarshipDto) {
    try {
      const isValid = validateJson(searchSchema, {
        context: searchScholarshipDto.context,
        message: searchScholarshipDto.message,
      });
      console.log('isValid', isValid);
      if (isValid !== true) throw new BadRequestException(isValid);
      this.sendSearchRequest(searchScholarshipDto);
      return isValid;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  async sendSearchRequest(searchScholarshipDto: SearchScholarshipDto) {
    try {
      const searchPayload = {
        context: searchScholarshipDto.context,
        message: searchScholarshipDto.message,
      };
      console.log('searchScholarshipDto', searchScholarshipDto);
      console.log(
        'searchScholarshipDto.gatwayUrl ',
        searchScholarshipDto.gatwayUrl + '/search',
      );
      await this.axiosService.post(
        'http://localhost:5005' + '/search',
        searchPayload,
      );
    } catch (error) {
      console.log('error===', error);
      throw error;
    }
  }

  on_search(searchScholarshipDto: SearchScholarshipDto) {
    try {
      console.log('searchScholarshipDto', searchScholarshipDto);
      const isValid = validateJson(onSearchSchema, {
        context: searchScholarshipDto.context,
        message: searchScholarshipDto.message,
      });
      console.log('isValid', isValid);
      if (isValid !== true) throw new BadRequestException(isValid);
      return isValid;
    } catch (error) {
      throw error;
    }
  }
}
