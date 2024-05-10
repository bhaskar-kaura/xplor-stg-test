import { Injectable } from '@nestjs/common';

import { xplorDomain } from '../.../../../common/constants/enums';
import { CourseSearchService } from '../../modules/app/request/course/services/searchv1.service';
import { Context } from '../../modules/app/request/job/interface/context';
import { Message } from '../../modules/app/request/job/interface/request/search';
import { JobSearchService } from '../../modules/app/request/job/services/searchv1.service';
import { ScholarshipSearchService } from 'src/modules/app/request/scholarship/services/searchv1.service';

@Injectable()
export class GlobalActionService {
  constructor(
    private readonly jobSearchService: JobSearchService,
    private readonly courseSearchService: CourseSearchService,
    private readonly scholarshipService: ScholarshipSearchService,
  ) {}
  // Assuming Context and Message are interfaces you've defined elsewhere
  // If they are not used, you might want to remove them from the function parameters

  async globalSearch(
    domain: Array<string>,
    context: Context,
    message: Message,
  ) {
    try {
      domain.forEach(async (currentDomain) => {
        switch (currentDomain) {
          case xplorDomain.job:
            // Logic for JOB_DOMAIN
            const searchResponse =
              await this.jobSearchService.sendSearchPayload(context, message);
            console.log(`Job: ${searchResponse}`);
            break;
          case xplorDomain.course:
            // Logic for COURSE_DOMAIN
            const searchResponseCourse =
              await this.courseSearchService.sendSearchPayload(
                context,
                message,
              );
            console.log(`Course: ${searchResponseCourse}`);
            break;
          case xplorDomain.scholarship:
            const searchResponseScholarship =
              await this.scholarshipService.sendSearchPayload(context, message);
            console.log(`Scholarship: ${searchResponseScholarship}`);
            break;
          default:
            // Default logic
            break;
        }
      });
    } catch (error) {
      console.error("error:::::",error);
      throw error
      // Handle error or return it as needed
    }
  }
}
