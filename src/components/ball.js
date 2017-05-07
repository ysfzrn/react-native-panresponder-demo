//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, PanResponder, Animated } from "react-native";
import SharedStyle from "../util/SharedStyle";

// create a component
class Ball extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY()
    };
  }

  componentWillMount() {
    this._animatedValueX = 0;
    this._animatedValueY = 0;
    this.state.pan.x.addListener(value => (this._animatedValueX = value.value));
    this.state.pan.y.addListener(value => (this._animatedValueY = value.value));
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({
          x: this._animatedValueX,
          y: this._animatedValueY
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: this.handleResponderMove,
      onPanResponderRelease: this.handleRelease
    });
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  }

  handleResponderMove = (evt, gestureState) => {
    this.state.pan.setValue({ x: gestureState.dx, y: gestureState.dy });
    this.props.onPositionChanging(evt.nativeEvent.pageX, evt.nativeEvent.pageY);
  };

  handleRelease = (evt, gestureState) => {
    const { ball } = this.props;
    this.state.pan.flattenOffset();
    this.props.onDrop(ball, evt.nativeEvent.pageX, evt.nativeEvent.pageY);
    Animated.spring(this.state.pan, {
      toValue: { x: 0, y: 0 },
      friction: 4,
      tension: 10
    }).start();
  };

  render() {
    const { ball } = this.props;
    const animatedStyle = {
      transform: this.state.pan.getTranslateTransform(),
      backgroundColor: ball.color,
      display: ball.selected ? "none" : "flex"
    };

    return (
      <Animated.View
        style={[styles.container, animatedStyle]}
        {...this.panResponder.panHandlers}
      />
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    width: SharedStyle.hole.width,
    height: SharedStyle.hole.height,
    borderRadius: SharedStyle.hole.height / 2,
    margin: 1
  }
});

//make this component available to the app
export default Ball;
