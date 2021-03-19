import React from 'react';
import PropTypes from 'prop-types';

import {
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
  View,
  Text,
} from 'react-native';

import {
  TabView,
  TabBar,
} from 'react-native-tab-view';

import styles from '../../shared/Styles.js';
import styles_component from './Styles.js';

import { fetchGet } from '../../services/http.service';

export default class Tab extends React.Component {

  state = {
    tabIndex: 0,
    tabRoutes: [
      {
        key: 'quote_1',
        title: 'Котировка 1',
      },
      {
        key: 'quote_2',
        title: 'Котировка 2',
      },
      {
        key: 'quote_3',
        title: 'Котировка 3',
      }
    ],
    dataStatus: 0,
    dataError: '',
    data: {
      quote_1: [],
      quote_2: [],
      quote_3: [],
    }
  }

  interval = null;

  componentDidMount() {
    this.loadQuotes();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { timerStatus } = nextProps;

    if (timerStatus === true) this.timerStart();
    else this.timerStop();

    return true;
  }

  render() {
    const { navigation, isLoadingApp } = this.props;
    const { tabIndex, tabRoutes } = this.state;
    if (isLoadingApp) return (
      <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor={'#f5f8fe'} barStyle="dark-content" />
        <TabView
          navigationState={{ index: tabIndex, routes: tabRoutes }}
          renderTabBar={this.renderTabBar}
          renderScene={this.renderScene}
          onIndexChange={(tabIndex) => {
            this.setState({ tabIndex });
          }}
          initialLayout={Dimensions.get('window').width}
          windowSize={1}
        />
      </SafeAreaView>
    );

    return null;
  }

  renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#000' }}
      scrollEnabled
      pressOpacity={0.8}
      renderLabel={({ route }) => (
        <Text>{route.title}</Text>
      )}
      tabStyle={{
        paddingLeft: 15,
        paddingRight: 15,
        width: 'auto',
      }}
    />
  );

  renderScene = ({ route }) => {
    const { data, dataStatus, dataError } = this.state;

    if (dataStatus === 0) return (
      <Text style={[styles.fs_16, styles.mt20, styles.tc]}>Загрузка ...</Text>
    );

    if (dataStatus === 2) return (
      <>
        <Text style={[styles.fs_16, styles.mt20, styles.tc]}>Ошибка при загрузке</Text>
        <Text style={[styles.fs_14, styles.mt20, styles.tc]}>{dataError}</Text>
      </>
    )

    return (
      <FlatList
        testID={`quotes-list-${route.title}`}
        style={[styles.plr, styles.pt20]}
        data={data[route.key]}
        keyExtractor={(item, index) =>
          `${index}-${item.last}-${item.highestBid}-${item.percentChange}`
        }
        ItemSeparatorComponent={() => (
          <View style={[styles.mt10]}/>
        )}
        ListFooterComponent={(
          <View style={[styles.mb40]}/>
        )}
        renderItem={({ item, index }) => (
          <View style={[styles.fdr, styles.w100]}>
            <View style={[styles.w20, styles.pr10]}>
              <Text style={styles.fs_10}>{item.name}</Text>
            </View>
            <View style={[styles.w30, styles.pr10]}>
              <Text style={[styles.fs_8, styles.tc]}>{item.last}</Text>
            </View>
            <View style={[styles.w30, styles.pr10]}>
              <Text style={[styles.fs_8, styles.tc]}>{item.highestBid}</Text>
            </View>
            <View style={[styles.w30, styles.pr10]}>
              <Text style={[styles.fs_8, styles.tc]}>{item.percentChange}</Text>
            </View>
          </View>
        )}
      />
    );
  };

  loadQuotes = (type = null) => {
    if (this.interval === null && type !== null) return false;

    fetchGet('https://poloniex.com/public', { command: 'returnTicker' })
      .then((result) => {
        const { data } = this.state;
        let d = data;
        let i = 0;

        for (key in result) {
          if (i > 30) break;
          let m = result[key];
          m.name = key;

          d['quote_1'].push(m);
          d['quote_2'].push(m);
          d['quote_3'].push(m);

          i++;
        }
        this.setState({ data: d, dataStatus: 1 });
      })
      .catch((error) => {
        this.setState({ dataStatus: 2, dataError: error });
        console.log(error);
      })
      .done();
  }

  timerStart = () => {
    if (this.interval !== null) return false;
    this.interval = setInterval(() => {
      this.loadQuotes('interval')
    }, 5000);
  }

  timerStop = () => {
    this.interval = null;
    clearInterval(this.interval);
  }
}

Tab.propTypes = {
  isLoadingApp: PropTypes.bool,
  timerStatus: PropTypes.bool,
};
