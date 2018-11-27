import React from 'react';
import {StyleSheet, Text, View , Button} from 'react-native';
import Navigator from './navigation/stackNavigation.js'
export default class App extends React.Component {

    render() {
    return (
     <Navigator/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
