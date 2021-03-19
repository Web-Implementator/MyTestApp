import { APP_STATUS, TIMER_STATUS } from './action-types';

const initState = {
  isLoadingApp: false,
  timerStatus: false,
};

export default function ApplicationReducer(state = initState, action) {
  switch (action.type) {
    case APP_STATUS:
      return Object.assign({}, state, { isLoadingApp: action.payload });
    case TIMER_STATUS:
      return Object.assign({}, state, { timerStatus: action.payload });

    default:
      return state;
  }
}
