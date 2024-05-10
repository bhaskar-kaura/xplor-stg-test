// Import necessary modules and services
import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SearchRequestDto } from './dto/search-request.dto';
import { OndcContext, OnestContext } from '../../util/context.builder';
import { GlobalActionService } from '../../common/action/global-action';
import { JobResponseService } from './response/job/job-response.service';
import { DomainsEnum } from '../../common/constants/enums';
import { AxiosService } from '../../common/axios/axios.service';
import { getResponse } from '../../util/response';
import { coreResponseMessage } from '../../common/constants/http-response-message';

// Decorator to mark this class as a provider that can be injected into other classes
@Injectable()
export class AppService {
  // Constructor to inject dependencies
  constructor(
    private readonly globalActionService: GlobalActionService, // Service for global actions
    private createPayload: JobResponseService, // Service to create job response payloads
    private readonly httpService: AxiosService, // Service for making HTTP requests
    private readonly configService: ConfigService, // Service for accessing configuration values
  ) {
    // Initialize the configService with a new instance
    this.configService = new ConfigService();
  }

  // Simple method to return a greeting string
  getHello(): string {
    return 'Hello World!';
  }

  // Method to perform a search operation
  async search(searchRequest: SearchRequestDto) {
    try {
      // Perform the global search using the injected service
      await this.globalActionService.globalSearch(
        searchRequest.domain,
        searchRequest.context,
        searchRequest.message,
      );
      // Return a success response
      return getResponse(
        true,
        coreResponseMessage.searchSuccessResponse,
        null,
        null,
      );
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      console.log(JSON.stringify(error?.response));
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  // Method to handle search requests and delegate to the sendSearch method
  async onSearch(response: OnestContext | OndcContext | any) {
    try {
      // Delegate the search operation to the sendSearch method
      await this.sendSearch(response);
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      console.log(error?.response);
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }

  // Method to send a search request to a specific service
  async sendSearch(response: SearchRequestDto) {
    try {
      // Initialize variables for job, course, and scholarship payloads
      let job: object, course: object, scholarship: object;
      // Determine which type of payload to create based on the domain
      switch (response.context.domain) {
        case DomainsEnum.JOB_DOMAIN:
          job = response.message
            ? this.createPayload.createPayload(response.message)
            : {};
          break;
        case DomainsEnum.COURSE_DOMAIN:
          course = response.message
            ? this.createPayload.createPayload(response.message)
            : {};
          break;
        case DomainsEnum.SCHOLARSHIP_DOMAIN:
          scholarship = response.message
            ? this.createPayload.createPayload(response.message)
            : {};
          break;
        default:
          break;
      }
      // Construct the payload for the search request
      const payload = {
        context: response.context,
        data: {
          job: job != null ? job : {},
          course: course != null ? course : {},
          scholarship: scholarship != null ? scholarship : {},
        },
      };
      // Construct the URL for the search request
      const url = this.configService.get('CORE_SERVICE_URL') + '/stg/on_search';
      // Send the search request and log the response
      const resp = await this.httpService.post(url, payload);
      console.log('resp', resp);
    } catch (error) {
      // Log the error and throw a BadGatewayException with a formatted error response
      console.log(error?.message);
      throw new BadGatewayException(
        getResponse(false, error?.message, null, error?.response?.data),
      );
    }
  }
}
