import React from 'react';
import {
  Text,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Navigator from '../screens/Navigator/';
import Tab from '../screens/Tab/';

import { setTimer } from '../reducer/application/actions';

const BottomTab = createBottomTabNavigator();
function BottomTabNavigator(props) {
  return (
    <BottomTab.Navigator
      // tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerMode: 'none'
      }}
    >
      <BottomTab.Screen
        options={{
          tabBarLabel: 'О приложении',
          tabBarIcon: ({ color, size }) => (
            <Text>🏠</Text>
          ),
        }}
        name="Info"
        component={Navigator}
      />
      <BottomTab.Screen
        options={{
          tabBarLabel: 'Котировки',
          tabBarIcon: ({ color, size }) => (
            <Text>₿</Text>
          ),
        }}
        name="Tab"
        component={Tab}
      />
    </BottomTab.Navigator>
  );
}

export default function AppRoute(props) {
  return (
    <NavigationContainer
      onStateChange={(state) => {
        if (state.routes[state.index].name === 'Tab') props.dispatch(setTimer(true));
        else props.dispatch(setTimer(false));
        // console.log(state.routes[state.index].name);
      }}
    >
      <BottomTabNavigator {...props} />
    </NavigationContainer>
  );
}
