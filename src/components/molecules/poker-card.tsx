import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface NumberCard {
  type: 'number';
  value: number;
}
export type CardContent = NumberCard;
interface Props {
  content: CardContent;
  selected: boolean;
}
export default class PokerCard extends Component<Props> {
  render() {
    const content = this.props.content;
    if (content.type === 'number') {
      return (
        <View
          style={[
            styles.outline,
            ...[this.props.selected ? [styles.selected] : []],
          ]}
        >
          <View style={styles.textLayer}>
            <Text style={styles.text}>{content.value}</Text>
          </View>
          <Text style={styles.smallText}>{content.value}</Text>
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
  selected: {
    backgroundColor: 'yellow',
  },
  textLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  smallText: {
    fontSize: 16,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  text: {
    fontSize: 32,
  },
});
