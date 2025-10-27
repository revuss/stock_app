import React from "react";
import { StyleSheet, Text, TextProps, useColorScheme } from "react-native";

interface Props extends TextProps {
  children: React.ReactNode;
}

const DescriptionBold: React.FC<Props> = ({ children, style, ...props }) => {
  const theme = useColorScheme() ?? "light";
  const color = theme === "dark" ? "#cfcfcf" : "#555";

  return (
    <Text style={[styles.description, { color }, style]} {...props}>
      {children}
    </Text>
  );
};

export default DescriptionBold;

const styles = StyleSheet.create({
  description: {
    fontFamily: "Montserrat_600SemiBold",
    textAlign: "center",
    lineHeight: 18,
  },
});
