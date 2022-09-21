import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import RootNavigator from './src/navigation';
const App = () => {
  return (
    <View style={styles.container}>
      <RootNavigator />
    </View>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightGray',
  },
});
