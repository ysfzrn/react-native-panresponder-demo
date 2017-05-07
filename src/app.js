//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator,Alert,TouchableOpacity } from "react-native";
import SharedStyle from "./util/SharedStyle";
import { hoverDropZone,selectDropZone, didGameOver, didIwin, refreshBoard, refreshBalls } from "./util";
import { Header, Hole, Ball } from "./components";

const initObj = {
  x: 0,
  y: 0,
  hovering: false,
  filled: false,
  color: SharedStyle.color.white,
  value: null
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holes: [],
      mainx: null,
      mainy: null,
      balls: [
        { id: 1, value: "R", color: SharedStyle.color.red, selected: false },
        { id: 2, value: "R", color: SharedStyle.color.red, selected: false },
        { id: 3, value: "R", color: SharedStyle.color.red, selected: false },
        { id: 4, value: "Y", color: SharedStyle.color.yellow, selected: false },
        { id: 5, value: "Y", color: SharedStyle.color.yellow, selected: false },
        { id: 6, value: "Y", color: SharedStyle.color.yellow, selected: false },
        { id: 7, value: "B", color: SharedStyle.color.blue, selected: false },
        { id: 8, value: "B", color: SharedStyle.color.blue, selected: false },
        { id: 9, value: "B", color: SharedStyle.color.blue, selected: false }
      ]
    };
  }

  componentDidMount() {
    this.digHole();
  }

  digHole = () => {
    let _holes = [];
    for (let i = 0; i < 9; i++) {
      _holes.push(initObj);
    }
    this.setState({ holes: _holes });
  };

  handleLayout = e => {
    const { x, y } = e.nativeEvent.layout;
    this.setState({ mainx: x, mainy: y });
  };

  holeLayout = (x, y, i) => {
    var _holes = this.state.holes;
    _holes[i] = { ..._holes[i], x, y };
    this.setState({ holes: _holes });
  };

  handlePositionChanging = (itemX, itemY) => {
    let _holes = this.state.holes;

    _holes = hoverDropZone(
      _holes,
      itemX,
      itemY,
      SharedStyle.hole.width,
      SharedStyle.hole.height,
      SharedStyle.header.height
    );
    this.setState({ holes: _holes });
  };

  handleDrop = (ball, itemX, itemY) => {
    let _holes = this.state.holes;
    let _balls = this.state.balls;

    const result = selectDropZone(
      _holes,
      itemX,
      itemY,
      SharedStyle.hole.width,
      SharedStyle.hole.height,
      _balls,
      ball,
      SharedStyle.header.height
    );
    _holes = result.holes;
    _balls = result.balls;

    if (didGameOver(_holes)) {
      this.setState({ gameOver: true });
      if (didIwin(_holes)) {
        Alert.alert("GAME OVER", "You Win", [{ text: "OK" }], {
          cancelable: false
        });
      } else {
        Alert.alert("GAME OVER", "You Lose", [{ text: "OK" }], {
          cancelable: false
        });
      }
    }

    this.setState({ holes: _holes, balls: _balls });
  };

  handleRefreshGame = () => {
    let holes = refreshBoard(this.state.holes);
    let balls = refreshBalls(this.state.balls);
    this.setState({ holes: holes, balls: balls });
  };

  render() {
    const { holes, mainx, mainy, balls } = this.state;
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.gameContainer}>
          <View style={styles.boardContainer} onLayout={this.handleLayout}>
            {mainx !== null && mainy !== null
              ? holes.map((hole, i) => {
                  return (
                    <Hole
                      key={i}
                      mainx={mainx}
                      mainy={mainy}
                      index={i}
                      hole={hole}
                      onHoleLayout={this.holeLayout}
                    />
                  );
                })
              : <ActivityIndicator />}
          </View>

          {balls.map((item, i) => {
            return (
              <Ball
                key={i}
                ball={item}
                onPositionChanging={this.handlePositionChanging}
                onDrop={this.handleDrop}
              />
            );
          })}

          <TouchableOpacity
            style={styles.refreshButton}
            onPress={() => this.handleRefreshGame()}
          >
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SharedStyle.color.primaryBlack,
    alignItems: "center"
  },
  gameContainer: {
    flex: 1,
    paddingLeft: SharedStyle.hole.width - 30,
    paddingRight: SharedStyle.hole.width - 30,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  boardContainer: {
    width: SharedStyle.hole.width * 3 + SharedStyle.hole.borderWidth * 3,
    height: SharedStyle.hole.height * 3 + SharedStyle.hole.borderWidth * 3,
    backgroundColor: SharedStyle.color.secondary,
    flexWrap: "wrap"
  },
  refreshButton: {
    width: "100%",
    height: 49,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 12,
    padding: 10,
    backgroundColor: SharedStyle.color.secondaryBlack
  },
  refreshButtonText: {
    fontSize: SharedStyle.text.regular,
    color: SharedStyle.color.white
  }
});

//make this component available to the app
export default App;
