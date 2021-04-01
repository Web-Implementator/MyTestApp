import React, { useState, useEffect } from 'react';

import {
  TouchableOpacity,
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
import styles_screen from './Styles.js';

import { fetchGet } from '../../services/http.service';

const Tab = (props) => {

  const [index, setIndex] = useState(0);
  const [tabRoute, setRoute] = useState([
    {
      index: 302, key: 'BTC_TRU'
    },
    {
      index: 267, key: 'BTC_WBTC'
    },
    {
      index: 26, key: 'BTC_ZEC'
    },
    {
      index: 153, key: 'BTC_XFIL'
    },
  ]);
  const [state, setState] = useState({
    data: {},
    dataStatus: 0,
    dataError: false
  });

  const { navigation, isLoadingApp } = props;

  const _renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#000' }}
      scrollEnabled
      pressOpacity={0.8}
      renderLabel={({ route }) => (
        <Text style={styles.fs_14}>{route.key}</Text>
      )}
      tabStyle={{
        alignItems: 'center',
        width: 120,
      }}
    />
  );

  const _renderScene = ({ route }) => {
    const { data, dataStatus, dataError } = state;

    if (dataStatus === 0) return (
      <Text style={[styles.fs_16, styles.mt20, styles.tc]}>Загрузка ...</Text>
    );

    if (dataError !== false) return (
      <>
        <Text style={[styles.fs_16, styles.mt20, styles.tc]}>Ошибка при загрузке</Text>
        <Text style={[styles.fs_14, styles.mt20, styles.tc]}>{dataError}</Text>
      </>
    )

    return (
      <FlatList
        testID={`quotes-list-${route.title}`}
        style={[styles.plr, styles.pt20]}
        data={data[route.index]}
        keyExtractor={(item, index) =>
          `${index}-${item.last}-${item.highestBid}-${item.percentChange}`
        }
        extraData={state.data}
        ItemSeparatorComponent={() => (
          <View style={[styles.mt10]}/>
        )}
        ListFooterComponent={(
          <View style={[styles.mb40]}/>
        )}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.fdr}>
              {index == 0 && (
                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                  <View style={{ flex: 1, alignSelf: 'stretch' }}>
                    <Text style={styles.fs_14}>name</Text>
                  </View>
                  <View style={{ flex: 1, alignSelf: 'stretch' }}>
                    <Text style={styles.fs_14}>baseVolume</Text>
                  </View>
                  <View style={{ flex: 1, alignSelf: 'stretch' }}>
                    <Text style={styles.fs_14}>last</Text>
                  </View>
                  <View style={{ flex: 1, alignSelf: 'stretch' }}>
                    <Text style={styles.fs_14}>quoteVolume</Text>
                  </View>
                  <View style={{ flex: 1, alignSelf: 'stretch' }}>
                    <Text style={styles.fs_14}>lowestAsk</Text>
                  </View>
                </View>
              )}
              <View style={{ flex: 1, alignSelf: 'stretch' }}>
                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                  <Text style={styles.fs_14}>{item.name}</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                  <Text style={styles.fs_14}>{item.baseVolume}</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                  <Text style={styles.fs_14}>{item.last}</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                  <Text style={styles.fs_14}>{item.quoteVolume}</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                  <Text style={styles.fs_14}>{item.lowestAsk}</Text>
                </View>
              </View>
            </View>
          )
        }}
      />
    );
  };

  useEffect(() => {
    const timerID = setInterval(() => {
      setState({ ...state, loading: true });
      fetchGet('https://poloniex.com/public', { command: 'returnTicker' })
        .then(result => {
          return Object.keys(result).map((value, index) => {
            result[value].name = value;
            return Object.values([result[value]])
          });
        })
       .then(newData => {
         setState({ data: newData, dataError: false, loading: false })
       })
       .catch(function(error) {
          setState({ data: {}, dataError: error, loading: false })
       })
    }, 25000)

    return () => clearInterval(timerID);
  });

  if (isLoadingApp) return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={'#f5f8fe'} barStyle="dark-content" />
      {setRoute.length === 0
        ?
        <Text style={styles.fs_14}>
          Загрузка ...
        </Text>
        :
        <TabView
          navigationState={{ index, routes: tabRoute }}
          renderTabBar={_renderTabBar}
          renderScene={_renderScene}
          onIndexChange={(index) => setIndex(index)}
          initialLayout={Dimensions.get('window').width}
          windowSize={1}
        />
      }
    </SafeAreaView>
  );
  else return null;
}

export default Tab;
