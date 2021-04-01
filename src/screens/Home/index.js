import { connect } from 'react-redux';

import Home from './Home';

export default connect(state => ({
  isLoadingApp: state.application.isLoadingApp,
}))(Home);
