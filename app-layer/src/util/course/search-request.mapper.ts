import { Action, DomainsEnum } from 'src/common/constants/enums';
import { CreateOnestContext, OnestContext } from '../context.builder';

interface CourseRequestBody {
  context: OnestContext;
  message: {
    intent: {
      item: {
        descriptor: {
          name: string;
        };
      };
    };
  };
}

export function CreateSearchRequestBody(
  bap_id,
  bap_url,
  searchQuery,
): CourseRequestBody {
  const searchObject = {
    context: CreateOnestContext(
      DomainsEnum.COURSE_DOMAIN,
      'a9aaecca-10b7-4d19-b640-b047a7c60008',
      Action.search,
      bap_id,
      bap_url,
    ),
    message: {
      intent: {
        item: {
          descriptor: {
            name: searchQuery,
          },
        },
      },
    },
  };
  return searchObject as CourseRequestBody;
}
