import { Action, DomainsEnum } from 'src/common/constants/enums';
import { v4 as uuidv4 } from 'uuid';

export interface OnestContext {
  domain: string;
  country: string;
  city: string;
  action: Action;
  timestamp: Date;
  version: string;
  bap_id: string;
  bap_uri: string;
  transaction_id: string;
  message_id: string;
  ttl: string;
}

export interface OndcContext {
  domain: string;
  country: string;
  city: string;
  action: Action;
  timestamp: Date;
  core_version: string;
  bap_id: string;
  bap_uri: string;
  transaction_id: string;
  message_id: string;
  ttl: string;
}

export function CreateOnestContext(
  domain: DomainsEnum,
  transaction_id: string,
  action: Action,
  bap_id: string,
  bap_url: string,
): OnestContext {
  const context: Partial<OnestContext> = {
    domain: domain,
    action: action,
    country: 'IND',
    city: 'std:080',
    timestamp: new Date(),
    version: '1.1.0',
    bap_id: bap_id,
    bap_uri: bap_url,
    transaction_id: transaction_id,
    message_id: uuidv4(),
    ttl: 'PT10M',
  };

  return context as OnestContext;
}

export function CreateOndcContext(
  domain: DomainsEnum,
  transaction_id: string,
  action: Action,
  bap_id: string,
  bap_url: string,
): OndcContext {
  const context: Partial<OndcContext> = {
    domain: domain,
    action: action,
    country: 'IND',
    city: 'std:080',
    timestamp: new Date(),
    core_version: '1.1.0',
    bap_id: bap_id,
    bap_uri: bap_url,
    transaction_id: transaction_id,
    message_id: uuidv4(),
    ttl: 'PT10M',
  };

  return context as OndcContext;
}
