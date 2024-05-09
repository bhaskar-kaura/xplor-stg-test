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
    private readonly scholarshipService: ScholarshipSearchService
  ) {}
  // Assuming Context and Message are interfaces you've defined elsewhere
  // If they are not used, you might want to remove them from the function parameters

  async globalSearch(
    domain: Array<string>,
    context: Context,
    message: Message,
  ) {
    domain.forEach(async (currentDomain) => {
      switch (currentDomain) {
        case xplorDomain.job:
          // Logic for JOB_DOMAIN
          try {
            const searchResponse =
              await this.jobSearchService.sendSearchPayload(context, message);
            console.log(`Job: ${searchResponse}`);
          } catch (error) {
            console.error(error);
            // Handle error or return it as needed
          }
          break;
        case xplorDomain.course:
          // Logic for COURSE_DOMAIN
          try {
            const searchResponse =
              await this.courseSearchService.sendSearchPayload(
                context,
                message,
              );
            console.log(`Course: ${searchResponse}`);
          } catch (error) {
            console.error(error);
            // Handle error or return it as needed
          }
          break;
        case xplorDomain.scholarship:
            try {
                const searchResponse =
                  await this.scholarshipService.sendSearchPayload(
                    context,
                    message,
                  );
                console.log(`Scholarship: ${searchResponse}`);
              } catch (error) {
                console.error(error);
                // Handle error or return it as needed
              }
              break;
        default:
          // Default logic
          break;
      }
    });
  }
}
