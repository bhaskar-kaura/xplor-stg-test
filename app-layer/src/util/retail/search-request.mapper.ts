import { Action, DomainsEnum } from 'src/common/constants/enums';
import { CreateOndcContext, OndcContext } from '../context.builder';

interface CourseRequestBody {
  context: OndcContext;
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
    context: CreateOndcContext(
      DomainsEnum.RETAIL_DOMAIN,
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
