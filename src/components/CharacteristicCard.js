import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//import {Base64} from '../lib/base64';
import base64 from 'react-native-base64';

const decodeBleString = value => {
  if (!value) {
    return '';
  }
  //  return '';
  return base64.decode(value).charCodeAt(0);
};

const CharacteristicCard = ({char}) => {
  const [measure, setMeasure] = useState('');
  const [descriptor, setDescriptor] = useState('');

  useEffect(() => {
    // discover characteristic descriptors
    char.descriptors().then(desc => {
      desc[0]?.read().then(val => {
        if (val) {
          setDescriptor(base64.decode(val.value));
          //  setDescriptor(val.value);
        }
      });
    });

    // read on the characteristic 👏
    char.monitor((err, cha) => {
      if (err) {
        console.warn('ERROR');
        return;
      }
      // each received value has to be decoded with a Base64 algorythm you can find on the Internet (or in my repository 😉)
      setMeasure(decodeBleString(cha?.value));
    });
  }, [char]);

  // write on a charactestic the number 6 (e.g.)
  const writeCharacteristic = () => {
    // encode the string with the Base64 algorythm
    char
      .writeWithResponse(base64.encode('6'))
      .then(() => {
        console.warn('Success');
      })
      .catch(e => console.log('Error', e));
  };

  return (
    <TouchableOpacity
      key={char.uuid}
      style={styles.container}
      onPress={writeCharacteristic}>
      <Text style={styles.measure}>{measure}</Text>
      <Text style={styles.descriptor}>{descriptor}</Text>
      <Text>{`isIndicatable : ${char.isIndicatable}`}</Text>
      <Text>{`isNotifiable : ${char.isNotifiable}`}</Text>
      <Text>{`isNotifying : ${char.isNotifying}`}</Text>
      <Text>{`isReadable : ${char.isReadable}`}</Text>
      <TouchableOpacity>
        <Text>{`isWritableWithResponse : ${char.isWritableWithResponse}`}</Text>
      </TouchableOpacity>
      <Text>{`isWritableWithoutResponse : ${char.isWritableWithoutResponse}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 12,
    borderRadius: 16,
    shadowColor: 'rgba(60,64,67,0.3)',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 12,
  },
  measure: {color: 'red', fontSize: 24},
  descriptor: {color: 'blue', fontSize: 24},
});

export default CharacteristicCard;
