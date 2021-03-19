import { connect } from 'react-redux';

import Navigator from './Navigator';

export default connect(state => ({
  isLoadingApp: state.application.isLoadingApp,
}))(Navigator);
