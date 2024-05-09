export enum DomainsEnum {
  JOB_DOMAIN = 'onest:work-opportunities',
  COURSE_DOMAIN = 'onest:learning-experiences',
  SCHOLARSHIP_DOMAIN = 'onest:financial-support',
  RETAIL_DOMAIN = 'ONDC:RET10',
}
export const xplorDomain = {
  course: 'course',
  job: 'job',
  scholarship: 'scholarship',
};

export enum Action {
  search = 'search',
  on_search = 'on_search',
  init = 'init',
  on_init = 'on_init',
  confirm = 'confirm',
  on_confirm = 'on_confirm',
  status = 'status',
  on_status = 'on_status',
}

export enum Gateway {
  job = 'https://wo-ps-bap-client.onest.network',
  course = 'https://fs-ps-bap-client.onest.network',
  scholarship = 'https://fs-ps-bap-client.onest.network',
}
