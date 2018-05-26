import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const { width: DEVICE_WIDTH } = Dimensions.get('window');

const Home = () => (
  <View style={styles.container}>
    <ImageBackground
      style={styles.background}
      source={require('../../assets/images/home-background.png')}
      resizeMode="cover"
    >
      <LinearGradient style={styles.background} colors={['rgba(0, 0, 0, 0.5)', 'transparent']}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Bengluru, Karnataka</Text>
          <Ionicons name="ios-sunny-outline" size={60} color="#fff" />
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperatureText}>26</Text>
            <Text style={styles.degreetext}>o</Text>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>

    <Swiper activeDotColor="rgba(0, 0, 0, 0.87)" horizontal>
      <View style={styles.slide}>
        <View style={styles.slideContent}>
          <Text style={styles.slideTitle}>SUN</Text>
          <Ionicons name="ios-sunny-outline" size={35} color="rgba(0, 0, 0, 0.54)" />
          <View style={styles.temperatureContainer}>
            <Text style={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.51)' }}>26</Text>
            <Text style={{ fontSize: 10, color: 'rgba(0, 0, 0, 0.51)' }}>o</Text>
          </View>
        </View>
        <View style={styles.slideContent}>
          <Text style={[styles.slideTitle, { color: 'rgba(0, 0, 0, 0.87)' }]}>MON</Text>
          <Ionicons name="ios-sunny-outline" size={35} color="rgba(0, 0, 0, 0.87)" />
          <View style={styles.temperatureContainer}>
            <Text style={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.87)' }}>26</Text>
            <Text style={{ fontSize: 10, color: 'rgba(0, 0, 0, 0.87)' }}>o</Text>
          </View>
        </View>
        <View style={styles.slideContent}>
          <Text style={styles.slideTitle}>TUE</Text>
          <Ionicons name="ios-sunny-outline" size={35} color="rgba(0, 0, 0, 0.54)" />
          <View style={styles.temperatureContainer}>
            <Text style={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.51)' }}>26</Text>
            <Text style={{ fontSize: 10, color: 'rgba(0, 0, 0, 0.51)' }}>o</Text>
          </View>
        </View>
      </View>

      <View style={styles.slide}>
        <View style={styles.slideContent}>
          <Text style={styles.slideTitle}>WED</Text>
          <Ionicons name="ios-sunny-outline" size={35} color="rgba(0, 0, 0, 0.54)" />
          <View style={styles.temperatureContainer}>
            <Text style={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.51)' }}>26</Text>
            <Text style={{ fontSize: 10, color: 'rgba(0, 0, 0, 0.51)' }}>o</Text>
          </View>
        </View>
        <View style={styles.slideContent}>
          <Text style={styles.slideTitle}>THU</Text>
          <Ionicons name="ios-sunny-outline" size={35} color="rgba(0, 0, 0, 0.54)" />
          <View style={styles.temperatureContainer}>
            <Text style={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.51)' }}>26</Text>
            <Text style={{ fontSize: 10, color: 'rgba(0, 0, 0, 0.51)' }}>o</Text>
          </View>
        </View>
        <View style={styles.slideContent}>
          <Text style={styles.slideTitle}>FRI</Text>
          <Ionicons name="ios-sunny-outline" size={35} color="rgba(0, 0, 0, 0.54)" />
          <View style={styles.temperatureContainer}>
            <Text style={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.51)' }}>26</Text>
            <Text style={{ fontSize: 10, color: 'rgba(0, 0, 0, 0.51)' }}>o</Text>
          </View>
        </View>
      </View>

      <View style={styles.slide}>
        <View style={styles.slideContent}>
          <Text style={styles.slideTitle}>SAT</Text>
          <Ionicons name="ios-sunny-outline" size={35} color="rgba(0, 0, 0, 0.54)" />
          <View style={styles.temperatureContainer}>
            <Text style={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.51)' }}>26</Text>
            <Text style={{ fontSize: 10, color: 'rgba(0, 0, 0, 0.51)' }}>o</Text>
          </View>
        </View>
      </View>
    </Swiper>
  </View>
);

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 2,
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
  temperatureContainer: {
    flexDirection: 'row',
  },
  temperatureText: {
    fontWeight: '700',
    fontSize: 70,
    color: '#fff',
  },
  degreetext: {
    fontWeight: '700',
    fontSize: 30,
    color: '#fff',
  },
  slide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: DEVICE_WIDTH,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  slideContent: {
    alignItems: 'center',
  },
  slideTitle: {
    fontWeight: '500',
    fontSize: 24,
    color: 'rgba(0, 0, 0, 0.51)',
  },
});
