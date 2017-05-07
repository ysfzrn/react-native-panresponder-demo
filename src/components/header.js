import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SharedStyle from '../util/SharedStyle'

const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}> Dig Dag Doe </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SharedStyle.header.marginBottom,
    height: SharedStyle.header.height,
    backgroundColor: SharedStyle.color.white
  },
  headerText: {
    fontSize: SharedStyle.text.large
  },
});

export default Header;
