import { connect } from 'react-redux';

import Tab from './Tab';

export default connect(state => ({
  isLoadingApp: state.application.isLoadingApp,
  timerStatus: state.application.timerStatus,
}))(Tab);
