import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Home = () => (
  <View style={styles.container}>
    <ImageBackground
      style={styles.background}
      source={require('../../assets/images/home-background.png')}
      resizeMode="cover"
    >
      <Ionicons name="md-menu" size={40} style={styles.menuicon} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bengluru, Karnataka</Text>
        <Ionicons name="ios-sunny-outline" size={80} color="#fff" />
        <Text style={styles.temperature}>26</Text>
      </View>
    </ImageBackground>
  </View>
);

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  menuicon: {
    marginTop: 10,
    marginLeft: 20,
    color: '#fff',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 30,
    marginBottom: 10,
  },
  temperature: {
    fontWeight: 700,
  },
});
