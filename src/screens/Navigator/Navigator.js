import React from 'react';
import PropTypes from 'prop-types';

import {
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
  View,
  Text,
} from 'react-native';

import styles from './../../shared/Styles.js';
import styles_component from './Styles.js';

export default class Navigator extends React.Component {
  render() {
    const { navigation, isLoadingApp } = this.props;
    if (isLoadingApp) return (
      <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor={'#f5f8fe'} barStyle="dark-content" />
        <View style={[styles.ac, styles.hr]}>
          <Text style={[styles.fs_20]}>О приложении</Text>
        </View>

        <View style={[styles.plr, { paddingTop: 20 }]}>

          <Text style={[styles.fWeight, styles.mb10]}>Тестовое приложение</Text>
          <Text style={[styles.fWeight, styles.mb20, styles.fs_10]}>Разработчик Web_Implementator</Text>

          <Text style={styles.mb20}>React Native + Redux + React Navigator</Text>

          <TouchableOpacity
            onPress={() => Linking.openURL('https://krasnoyarsk.hh.ru/resume/742f2f3aff03a30aff0039ed1f4871456b7448?print=true')}
            style={[styles.button, styles.mb10, styles.ac, { padding: 10}]}
          >
            <Text style={{fontWeight: 'bold'}}>Резюме</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Tab')}
            style={[styles.button, styles.ac, { padding: 10}]}
          >
            <Text style={{fontWeight: 'bold'}}>Котировки</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );

    return null;
  }
}

Navigator.propTypes = {
  isLoadingApp: PropTypes.bool,
};
