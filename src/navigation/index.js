/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import DeviceScreen from '../screens/Device';
import BleManagerScreen from '../screens/BleManagerScreen';
import {Image, TouchableOpacity} from 'react-native';

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator mode="card">
      <Stack.Screen name="BleManagerScreen" component={BleManagerScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Device"
        component={DeviceScreen}
        options={({navigation}) => ({
          headerLeft: props => (
            <TouchableOpacity
              onPress={() => console.log('clicked', navigation.goBack())}>
              <Image
                source={require('../assets/images/arrow_back2x.png')}
                style={{width: 28, height: 28, marginRight: 10}}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
export default RootNavigator;
