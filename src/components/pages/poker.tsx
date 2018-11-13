import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import CardSlider from '../organisms/card-slider';

type Props = {};
export default class PokerPage extends Component<Props> {
  render() {
    return (
      <View style={styles.slider}>
        <CardSlider />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slider: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
});