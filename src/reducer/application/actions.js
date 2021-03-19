import { APP_STATUS, TIMER_STATUS } from './action-types';

export const setAppState = (payload) => ({
  type: APP_STATUS,
  payload,
});

export const setTimer = (payload) => ({
  type: TIMER_STATUS,
  payload,
});
