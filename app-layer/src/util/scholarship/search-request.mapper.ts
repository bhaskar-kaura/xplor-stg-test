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
  bap_id: string,
  bap_url: string,
  transaction_id: string,
  message_id: string,
  searchQuery: string,
  country: string,
  city: string,
): CourseRequestBody {
  const searchObject = {
    context: CreateOnestContext(
      DomainsEnum.SCHOLARSHIP_DOMAIN,
      transaction_id,
      message_id,
      Action.search,
      bap_id,
      bap_url,
      country,
      city,
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
