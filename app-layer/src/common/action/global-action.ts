import { Injectable } from '@nestjs/common';

import { xplorDomain } from '../.../../../common/constants/enums';
import { CourseSearchService } from '../../modules/app/request/course/services/searchv1.service';
import { Context } from '../../modules/app/request/job/interface/context';
import { Message } from '../../modules/app/request/job/interface/request/search';
import { JobSearchService } from '../../modules/app/request/job/services/searchv1.service';
import { ScholarshipSearchService } from 'src/modules/app/request/scholarship/services/searchv1.service';
import { RetailSearchService } from 'src/modules/app/request/retail/services/searchv1.service';

@Injectable()
export class GlobalActionService {
  constructor(
    private readonly jobSearchService: JobSearchService,
    private readonly courseSearchService: CourseSearchService,
    private readonly scholarshipService: ScholarshipSearchService,
    private readonly retailService: RetailSearchService,
  ) {}

  /**
   * Performs a global search across different domains (job, course, scholarship).
   * This method iterates over the provided domain array and executes the search operation
   * for each domain using the corresponding service. It logs the search response for each domain.
   *
   * @param domain An array of domain strings indicating the type of search to perform.
   * @param context The context object containing information relevant to the search operation.
   * @param message The message object containing the search parameters.
   */
  async globalSearch(
    domain: Array<string>,
    context: Context,
    message: Message,
  ) {
    try {
      // Iterate over each domain in the provided array
      domain.forEach(async (currentDomain) => {
        // Switch statement to handle different domains
        switch (currentDomain) {
          case xplorDomain.job:
            // Logic for JOB_DOMAIN
            // Perform the search operation using the JobSearchService
            const searchResponse =
              await this.jobSearchService.sendSearchPayload(context, message);
            // Log the search response for the job domain
            console.log(`Job: ${searchResponse}`);
            break;
          case xplorDomain.course:
            // Logic for COURSE_DOMAIN
            // Perform the search operation using the CourseSearchService
            const searchResponseCourse =
              await this.courseSearchService.sendSearchPayload(
                context,
                message,
              );
            // Log the search response for the course domain
            console.log(`Course: ${searchResponseCourse}`);
            break;
          case xplorDomain.scholarship:
            // Logic for SCHOLARSHIP_DOMAIN
            // Perform the search operation using the ScholarshipSearchService
            const searchResponseScholarship =
              await this.scholarshipService.sendSearchPayload(context, message);
            // Log the search response for the scholarship domain
            console.log(`Scholarship: ${searchResponseScholarship}`);
            break;
          case xplorDomain.retail:
            // Logic for SCHOLARSHIP_DOMAIN
            // Perform the search operation using the RetailService
            const searchResponseRetail =
              await this.retailService.sendSearchPayload(context, message);
            // Log the search response for the retail domain
            console.log(`Retail: ${searchResponseRetail}`);
            break;
          default:
            // Default case if the domain does not match any of the expected values
            // No specific action is taken here, but you could add logic to handle unexpected domains
            break;
        }
      });
    } catch (error) {
      // Catch any errors that occur during the search operations
      // Log the error for debugging purposes
      console.error(error);
      // Rethrow the error to be handled by the caller
      throw error;
    }
  }
}
