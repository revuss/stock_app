import React from "react";
import { StyleSheet, Text, TextProps, useColorScheme } from "react-native";

interface DescriptionTextProps extends TextProps {
  children: React.ReactNode;
}

const DescriptionText: React.FC<DescriptionTextProps> = ({
  children,
  style,
  ...props
}) => {
  const theme = useColorScheme() ?? "light";
  const color = theme === "dark" ? "#cfcfcf" : "#555";

  return (
    <Text style={[styles.description, { color }, style]} {...props}>
      {children}
    </Text>
  );
};

export default DescriptionText;

const styles = StyleSheet.create({
  description: {
    fontFamily: "Montserrat_400Regular",
    textAlign: "center",
    lineHeight: 18,
  },
});
