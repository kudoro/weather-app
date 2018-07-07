import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Constants, Permissions, Location, LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import _ from 'lodash';

import getWeatherIconName from '../../utils.js/getWeatherIconName';

const WEATHER_API_KEY = '69f95bb4c7a6daf7c80f11a1f3b9c3d1';

class Home extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    weatherData: null,
    date: moment().format('LLLL'),
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

  getNearestWeatherData = () => {
    const weatherDataList = this.state.weatherData ? this.state.weatherData.list : [];
    const date = new Date();
    const currentTimeStamp = Math.round((date.valueOf() + date.getTimezoneOffset() * 60000) / 1000);
    let nearestWeatherData = weatherDataList[0];

    weatherDataList.forEach((weatherData) => {
      if (Math.abs(currentTimeStamp - nearestWeatherData.dt) > Math.abs(currentTimeStamp - weatherData.dt)) {
        nearestWeatherData = weatherData;
      }
    });

    return nearestWeatherData;
  };

  getHourlyWeatherData = () => {
    const weatherDataList = this.state.weatherData ? this.state.weatherData.list : [];
    const date = new Date();
    const currentTimeStamp = Math.round((date.valueOf() + date.getTimezoneOffset() * 60000) / 1000);

    const filteredList = weatherDataList.filter(weatherData => weatherData.dt > currentTimeStamp);
    const orderedList = _.sortBy(filteredList, ['dt']);
    const hourlyDataList = _.slice(orderedList, 0, 6);

    return hourlyDataList;
  };

  getMaxAndMinTemperature = () => {
    const weatherDataList = this.state.weatherData ? this.state.weatherData.list : [];
    const startOpoch = moment()
      .startOf('day')
      .unix();
    const endOpoch = moment()
      .endOf('day')
      .unix();
    const filteredData = weatherDataList.filter(data => data.dt > startOpoch && data.dt < endOpoch);
    let minTemp = filteredData[0] ? filteredData[0].main.temp_min : 0;
    let maxTemp = filteredData[0] ? filteredData[0].main.temp_max : 0;

    filteredData.forEach((data) => {
      if (data.main.temp_min < minTemp) {
        minTemp = data.main.temp_min;
      }
      if (data.main.temp_max > maxTemp) {
        maxTemp = data.main.temp_max;
      }
    });

    return { minTemp, maxTemp };
  };

  render() {
    const currentWeatherData = this.getNearestWeatherData();
    const hourlyWeatherData = this.getHourlyWeatherData();

    return (
      <View style={styles.container}>
        <LinearGradient style={styles.container} colors={['#4c669f', '#3b5998']}>
          {this.state.weatherData && !this.state.errorMessage ? (
            <View style={styles.contentContainer}>
              <View style={styles.mainInfoContainer}>
                <View style={styles.row}>
                  <Ionicons name="md-locate" size={20} color="#fff" style={{ marginRight: 10 }} />
                  <Text style={styles.title}>{this.state.weatherData.city.name}</Text>
                </View>

                <Text style={styles.subTitle}>{this.state.date}</Text>

                <View style={[styles.row, { paddingTop: 10 }]}>
                  <Ionicons name={getWeatherIconName(currentWeatherData.weather[0].icon)} size={60} color="#fff" style={{ marginRight: 20 }} />
                  <Text style={styles.temperatureText}>{currentWeatherData.main.temp}</Text>
                  <Text style={styles.degreetext}>o</Text>
                  <Text style={styles.temperatureText}>c</Text>
                </View>

                <Text style={styles.weatherDescription}>
                  {currentWeatherData.weather[0].description
                    .split(' ')
                    .map(str => _.capitalize(str))
                    .join(' ')}
                </Text>
              </View>

              <View style={styles.hourlyInfoContainers}>
                {hourlyWeatherData.map((data, index) => (
                  <View key={data.dt} style={[styles.hourlyInfoContainer, { borderLeftWidth: index === 0 ? 0 : 1 }]}>
                    <View style={styles.row}>
                      <Text style={styles.weatherDescription}>{Math.round(data.main.temp)}</Text>
                      <Text
                        style={{
                          fontSize: 10,
                          marginLeft: 2,
                          color: '#fff',
                          alignSelf: 'flex-start',
                        }}
                      >
                        o
                      </Text>
                      <Text style={styles.weatherDescription}>c</Text>
                    </View>
                    <Ionicons name={getWeatherIconName(data.weather[0].icon)} size={30} color="#fff" style={{ marginBottom: 10 }} />
                    <Text style={styles.subTitle}>{moment(data.dt * 1000).format('HH:mm')}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.extraInfoContainer}>
                <View style={styles.row}>
                  <View style={[styles.gridContainer, { borderRightWidth: 1, borderBottomWidth: 1 }]}>
                    <Text style={styles.label}>Min Temperature</Text>
                    <View style={[styles.row, { display: 'flex' }]}>
                      <Text style={styles.label}>{this.getMaxAndMinTemperature().minTemp}</Text>
                      <Text
                        style={{
                          fontSize: 10,
                          alignSelf: 'flex-start',
                          color: '#fff',
                          marginLeft: 2,
                        }}
                      >
                        o
                      </Text>
                      <Text style={styles.label}>c</Text>
                    </View>
                  </View>
                  <View style={[styles.gridContainer, { borderLeftWidth: 1, borderBottomWidth: 1 }]}>
                    <Text style={styles.label}>Max Temperature</Text>
                    <View style={styles.row}>
                      <Text style={styles.label}>{this.getMaxAndMinTemperature().maxTemp}</Text>
                      <Text
                        style={{
                          fontSize: 10,
                          alignSelf: 'flex-start',
                          color: '#fff',
                          marginLeft: 2,
                        }}
                      >
                        o
                      </Text>
                      <Text style={styles.label}>c</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.gridContainer, { borderRightWidth: 1, borderTopWidth: 1 }]}>
                    <Text style={styles.label}>Humidity</Text>
                    <View style={styles.row}>
                      <Ionicons name="ios-water" size={16} color="#fff" style={{ marginRight: 10 }} />
                      <Text style={styles.label}>{`${currentWeatherData.main.humidity} %`}</Text>
                    </View>
                  </View>
                  <View style={[styles.gridContainer, { borderLeftWidth: 1, borderTopWidth: 1 }]}>
                    <Text style={styles.label}>Pressure</Text>
                    <View style={styles.row}>
                      <Ionicons name="ios-thermometer-outline" size={16} color="#fff" style={{ marginRight: 10 }} />
                      <Text style={styles.label}>{`${currentWeatherData.main.pressure} hpa`}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            </View>
          )}
        </LinearGradient>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 30,
    flex: 1,
    justifyContent: 'space-between',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainInfoContainer: {
    padding: 20,
    alignItems: 'center',
  },
  extraInfoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hourlyInfoContainers: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hourlyInfoContainer: {
    flex: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  errorMessage: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 16,
    color: '#fff',
  },
  temperatureText: {
    fontSize: 60,
    fontWeight: '100',
    color: '#fff',
    marginRight: 5,
  },
  degreetext: {
    fontSize: 15,
    color: '#fff',
    alignSelf: 'flex-start',
    marginRight: 5,
  },
  weatherDescription: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#fff',
  },
});
