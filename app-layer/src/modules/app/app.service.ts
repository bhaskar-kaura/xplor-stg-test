import { Injectable } from '@nestjs/common';
import { SearchRequestDto } from './dto/search-request.dto';

import { OndcContext, OnestContext } from 'src/util/context.builder';
import { GlobalActionService } from 'src/common/action/global-action';
import { AckNackResponse } from 'src/common/action/ack-nack.entity';

import { JobResponseService } from './response/job/job-response.service';
import { DomainsEnum } from 'src/common/constants/enums';

@Injectable()
export class AppService {
  constructor(private readonly globalActionService: GlobalActionService, private  createPayload:JobResponseService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async search(searchRequest: SearchRequestDto) {
    try {
      await this.globalActionService.globalSearch(
        searchRequest.domain,
        searchRequest.context,
        searchRequest.message,
      );
      return  new AckNackResponse("ACK");
    } catch (error) {
      console.log(JSON.stringify(error?.response?.data));
      throw error?.response;
    }
  }
  async onSearch(response: OnestContext | OndcContext | any) {
   
      await this.sendSearch(response)
    
  }
  
  async sendSearch(response: SearchRequestDto)
  {
    let job:object|string="", course:object|string="", scholarship:object|string=""
    switch (response.context.domain)
    {
      case DomainsEnum.JOB_DOMAIN:
        job = response.message ? this.createPayload.createPayload(response.message) : ""
        break;
      case DomainsEnum.COURSE_DOMAIN:
        course = response.message ? this.createPayload.createPayload(response.message) : ""
        break;
      case DomainsEnum.SCHOLARSHIP_DOMAIN:
        scholarship = response.message ? this.createPayload.createPayload(response.message) : ""
        break;
      default:
        break
      
    }
    const payload = {
      job: job,
      course: course,
      scholarship:scholarship
    }
    console.log(JSON.stringify(payload.course))
  }
  
}
