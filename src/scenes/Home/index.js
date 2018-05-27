import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Dimensions, Platform } from 'react-native';
import Swiper from 'react-native-swiper';
import { LinearGradient, Permissions, Location, Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const { width: DEVICE_WIDTH } = Dimensions.get('window');
const WEATHER_API_KEY = '69f95bb4c7a6daf7c80f11a1f3b9c3d1';

class Home extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    weatherData: null,
  };

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getLocationAsync();
    }
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      this.setState(
        {
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        },
        () => {
          this.getWeatherUsingLatlng();
        },
      );
    } else {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
  };

  getWeatherUsingLatlng = async () => {
    await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.state.location.latitude}&lon=${
      this.state.location.longitude
    }&appid=${WEATHER_API_KEY}&units=metric`)
      .then(data => data.json())
      .then((result) => {
        this.setState({
          weatherData: result,
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require('../../assets/images/home-background.png')}
          resizeMode="cover"
        >
          <LinearGradient style={styles.background} colors={['rgba(0, 0, 0, 0.5)', 'transparent']}>
            <View style={styles.titleContainer}>
              {this.state.weatherData && !this.state.errorMessage ? (
                [
                  <Text key="title" style={styles.title}>
                    {`${this.state.weatherData.city.name}, ${this.state.weatherData.city.country}`}
                  </Text>,
                  <Ionicons key="icon" name="ios-sunny-outline" size={60} color="#fff" />,
                  <View key="temperature" style={styles.temperatureContainer}>
                    <Text style={styles.temperatureText}>{this.state.weatherData.list[0].main.temp}</Text>
                    <Text style={styles.degreetext}>o</Text>
                  </View>,
                ]
              ) : (
                <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
              )}
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
  }
}

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
  errorMessage: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
});
