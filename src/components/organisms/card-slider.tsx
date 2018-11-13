import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {};
export default class CardSlider extends Component<Props> {
  render() {
    return <View style={styles.wideSlider} />;
  }
}

const styles = StyleSheet.create({
  wideSlider: {
    width: '100%',
    backgroundColor: 'black',
    height: 200,
  },
});
