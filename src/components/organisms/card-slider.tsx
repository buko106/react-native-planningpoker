import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
  LayoutChangeEvent,
} from 'react-native';

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

  currentLocationX: number | null = null;
  currentLocationY: number | null = null;
  selectedNumber: number | null = null;
  currentPosition = 0.5;
  sliderWidth: number = 0;

  onTouchMove(event: GestureResponderEvent) {
    const e = event.nativeEvent;

    if (this.currentLocationX != null) {
      const diff = e.locationX - this.currentLocationX;
      let nextPosition = this.currentPosition + diff / 150;
      nextPosition = Math.max(0, nextPosition);
      nextPosition = Math.min(nextPosition, 0.99999);

      this.currentPosition = nextPosition;
      this.forceUpdate();
    }

    if (this.selectedNumber == null && this.currentLocationY != null) {
      const diff = e.locationY - this.currentLocationY;
      const swipeThreshold = 3.0;
      const selectionThreshold = 0.03;

      if (-diff > swipeThreshold) {
        const length = this.state.cardContents.length;
        this.state.cardContents.forEach((content, index) => {
          if ((index + 0.5) / length < selectionThreshold) {
            this.selectedNumber = content.value;
          }
        });
      }
    }

    this.currentLocationX = e.locationX;
    this.currentLocationY = e.locationY;
  }

  onTouchEnd(event: GestureResponderEvent) {
    const e = event.nativeEvent;
    this.currentLocationX = null;
    this.currentLocationY = null;
  }

  onTouchStart(event: GestureResponderEvent) {
    const e = event.nativeEvent;
    this.currentLocationX = e.locationX;
    this.currentLocationY = e.locationY;
  }

  onLayout(event: LayoutChangeEvent) {
    this.sliderWidth = event.nativeEvent.layout.width;
  }

  render() {
    const length = this.state.cardContents.length;
    return (
      <View
        style={styles.wideSlider}
        onLayout={event => this.onLayout(event)}
        onTouchMove={event => this.onTouchMove(event)}
        onTouchEnd={event => this.onTouchEnd(event)}
        onTouchStart={event => this.onTouchStart(event)}
      >
        {this.state.cardContents.map((content, index) => (
          <View
            key={index}
            style={getCardPosition(
              index / length,
              (index + 0.5) / length,
              this.currentPosition
            )}
          >
            <PokerCard
              content={content}
              selected={content.value === this.selectedNumber}
            />
          </View>
        ))}
      </View>
    );
  }
}

function getCardPosition(
  left: number,
  center: number,
  current: number
): ViewStyle {
  const diff = (current - center) * 15.0;
  const bottom = 1 / (1 + diff * diff);
  return {
    position: 'absolute',
    left: `${left * 100}%`,
    bottom: `${bottom > 0.15 ? bottom * 100 : 0}%`,
  };
}

const styles = StyleSheet.create({
  wideSlider: {
    width: '100%',
    backgroundColor: 'white',
    height: 150,
  },
});
