import { action } from './action';
import { member } from './member';
import { partner } from './partner';
import { report } from './report';
import { localeString, localeText } from './localeString';

export const schemaTypes = [
  localeString,
  localeText,
  action,
  member,
  partner,
  report,
];
