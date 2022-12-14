import React, {useCallback, useEffect, useState} from 'react';
import {Text, ScrollView, Button, View} from 'react-native';
import {ServiceCard} from '../../components/ServiceCard';
import styles from './styles';
const DeviceScreen = ({route, navigation}) => {
  // get the device object which was given through navigation params
  const {device} = route.params;

  const [isConnected, setIsConnected] = useState(false);
  const [services, setServices] = useState([]);

  // handle the device disconnection
  const disconnectDevice = useCallback(async () => {
    navigation.goBack();
    const isDeviceConnected = await device.isConnected();
    if (isDeviceConnected) {
      await device.cancelConnection();
    }
  }, [device, navigation]);

  useEffect(() => {
    const getDeviceInformations = async () => {
      // connect to the device
      const connectedDevice = await device.connect();
      setIsConnected(true);

      // discover all device services and characteristics
      const allServicesAndCharacteristics =
        await connectedDevice.discoverAllServicesAndCharacteristics();
      // get the services only
      const discoveredServices = await allServicesAndCharacteristics.services();
      setServices(discoveredServices);
    };

    getDeviceInformations();

    device.onDisconnected(() => {
      navigation.navigate('Home');
    });

    // give a callback to the useEffect to disconnect the device when we will leave the device screen
    return () => {
      disconnectDevice();
    };
  }, [device, disconnectDevice, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="disconnect" onPress={disconnectDevice} />
      <View>
        <View style={styles.header}>
          <Text>{`Id : ${device.id}`}</Text>
          <Text>{`Name : ${device.name}`}</Text>
          <Text>{`Is connected : ${isConnected}`}</Text>
          <Text>{`RSSI : ${device.rssi}`}</Text>
          <Text>{`Manufacturer : ${device.manufacturerData}`}</Text>
          <Text>{`ServiceData : ${device.serviceData}`}</Text>
          <Text>{`UUIDS : ${device.serviceUUIDs}`}</Text>
        </View>
        {/* Display a list of all services */}
        {services && services.map(service => <ServiceCard service={service} />)}
      </View>
    </ScrollView>
  );
};
export default DeviceScreen;
