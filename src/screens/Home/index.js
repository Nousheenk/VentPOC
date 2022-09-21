/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  View,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import DeviceCard from '../../components/DeviceCard';
import {BleManager} from 'react-native-ble-plx';

const manager = new BleManager();

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scannedDevices, setScannedDevices] = useState();

  useEffect(() => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
          // this.retrieveConnected()
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }
  });

  //check whether bluetooth is on or off state
  const checkBluetoothIsOn = async () => {
    const btState = await manager.state();
    console.log('btState-->', btState);
    // test is bluetooth is supported
    if (btState === 'Unsupported') {
      alert('Bluetooth is not supported');
      return false;
    }
    // enable if it is not powered on
    if (btState !== 'PoweredOn') {
      await manager.enable();
    } else {
      await manager.disable();
    }
    return true;
  };

  const scanDevices = () => {
    // display the Activityindicator
    setIsLoading(true);
    let devicesList = [];
    // scan devices
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn('error-->', error);
      }
      if (scannedDevice) {
        devicesList.push(scannedDevice);
        console.log('scannedDevice-->', scannedDevice);
        setScannedDevices(devicesList);
      }
    });

    // stop scanning devices after 5 seconds
    setTimeout(() => {
      manager.stopDeviceScan();
      setIsLoading(false);
    }, 5000);
  };

  const ListHeaderComponent = () => (
    <View style={styles.body}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Step One</Text>
      </View>
      <View style={styles.sectionContainer}>
        {isLoading ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator color={'teal'} size={25} />
          </View>
        ) : (
          <Button title="Scan devices" onPress={scanDevices} />
        )}
      </View>
    </View>
  );

  useEffect(() => {
    return () => {
      manager.destroy();
    };
  }, []);
  return (
    <SafeAreaView style={styles.body}>
      <FlatList
        keyExtractor={item => Math.random() * 10}
        data={scannedDevices}
        renderItem={({item}) => <DeviceCard device={item} />}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
