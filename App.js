import React from 'react';
import { StyleSheet, StatusBar, View, Platform } from 'react-native';
import { Constants } from 'expo';

import Home from './src/scenes/Home';

const App = () => (
  <View style={styles.container}>
    <View style={styles.statusbar}>
      <StatusBar />
    </View>
    <Home />
  </View>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusbar: {
    height: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    backgroundColor: 'black',
  },
});
