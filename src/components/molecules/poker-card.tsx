import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface NumberCard {
  type: 'number';
  value: number;
}
export type CardContent = NumberCard;
type Props = { content: CardContent };
export default class PokerCard extends Component<Props> {
  render() {
    const content = this.props.content;
    if (content.type === 'number') {
      return (
        <View style={styles.outline}>
          <Text style={styles.text}>{content.value}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  outline: {
    height: 150,
    width: 150 / 1.68,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 5,
    borderColor: 'red',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
  },
});
