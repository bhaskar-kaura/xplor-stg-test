import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateScholarshipDto } from '../dto/update-scholarship.dto';
import validateJson from '../../../utils/validator';
import { searchSchema } from '../schema/search.schema';
import { SearchScholarshipDto } from '../dto/search-scholarship.dto';
import { AxiosService } from '../../../common/axios/axios.service';
import { HttpService } from '@nestjs/axios';

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
      await this.httpService.axiosRef.post(
        searchScholarshipDto.gatwayUrl + '/search',
        searchPayload,
      );
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
  findAll() {
    return `This action returns all scholarship`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scholarship`;
  }

  update(id: number, updateScholarshipDto: UpdateScholarshipDto) {
    return `This action updates a #${id} scholarship`;
  }

  remove(id: number) {
    return `This action removes a #${id} scholarship`;
  }
}
