import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import PokerCard, { CardContent, NumberCard } from '../molecules/poker-card';

type Props = {};
type State = { cardContents: CardContent[] };

const NUMBERS = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];
export default class CardSlider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cardContents: NUMBERS.map(
        (val: number) => ({ type: 'number', value: val } as NumberCard)
      ),
    };
  }

  render() {
    return (
      <View style={styles.wideSlider}>
        {this.state.cardContents.map((content, index) => (
          <PokerCard key={index} content={content} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wideSlider: {
    width: '100%',
    backgroundColor: 'black',
    height: 200,
  },
});
