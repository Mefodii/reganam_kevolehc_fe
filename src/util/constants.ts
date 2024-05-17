export const BLANK_VALUE = ' ----- ';
// TODO - maybe to send these as info response from Django
export const WATCHING_STATUS_FINISHED = 'Finished';
export const WATCHING_STATUS_PREMIERE = 'Premiere';
export const WATCHING_STATUS_PLANNED = 'Planned';
export const WATCHING_STATUS_WATCHING = 'Watching';

export enum APIStatus {
  NONE = 'none',
  PENDING = 'pending',
  OK = 'ok',
  NOT_OK = 'not_ok',
}
