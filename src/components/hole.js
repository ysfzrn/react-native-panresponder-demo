//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import SharedStyle from "../util/SharedStyle";

// create a component
class Hole extends Component {
  constructor() {
    super();
    this.state = {
      x: null,
      y: null
    };
  }

  handleLayout = e => {
    const { mainx, mainy, index } = this.props;
    const { x, y } = e.nativeEvent.layout;
    this.setState({ x: mainx + x, y: mainy + y });
    this.props.onHoleLayout(mainx + x, mainy + y, index);
  };

  render() {
    const { hole } = this.props;
    const { x, y } = this.state;
    const holeExtraStyle = {
      backgroundColor: hole.hovering
        ? SharedStyle.color.hoverColor
        : hole.filled ? hole.color : SharedStyle.color.white
    };

    return (
      <View
        style={[styles.container, holeExtraStyle]}
        onLayout={this.handleLayout}
      />
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: SharedStyle.hole.width,
    height: SharedStyle.hole.height,
    backgroundColor: SharedStyle.color.white,
    borderWidth: SharedStyle.hole.borderWidth,
    borderColor: SharedStyle.color.primaryBlack
  }
});

//make this component available to the app
export default Hole;
