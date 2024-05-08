import { Action, DomainsEnum } from 'src/common/constants/enums';

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
  message_id: string,
  action: Action,
  bap_id: string,
  bap_url: string,
  country: string,
  city: string,
): OnestContext {
  const context: Partial<OnestContext> = {
    domain: domain,
    action: action,
    country: country,
    city: city,
    timestamp: new Date(),
    version: '1.1.0',
    bap_id: bap_id,
    bap_uri: bap_url,
    transaction_id: transaction_id,
    message_id: message_id,
    ttl: 'PT10M',
  };

  return context as OnestContext;
}

export function CreateOndcContext(
  domain: DomainsEnum,
  transaction_id: string,
  message_id: string,
  action: Action,
  bap_id: string,
  bap_url: string,
  country: string,
  city: string,
): OndcContext {
  const context: Partial<OndcContext> = {
    domain: domain,
    action: action,
    country: country,
    city: city,
    timestamp: new Date(),
    core_version: '1.1.0',
    bap_id: bap_id,
    bap_uri: bap_url,
    transaction_id: transaction_id,
    message_id: message_id,
    ttl: 'PT10M',
  };

  return context as OndcContext;
}
