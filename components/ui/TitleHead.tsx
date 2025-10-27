import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, TextProps, useColorScheme } from "react-native";

interface TitleHeadProps extends TextProps {
  children: React.ReactNode;
}

const TitleHead: React.FC<TitleHeadProps> = ({ children, style, ...props }) => {
  const theme = useColorScheme() ?? "light";
  const color = Colors[theme].text;

  return (
    <Text style={[styles.title, { color }, style]} {...props}>
      {children}
    </Text>
  );
};

export default TitleHead;

const styles = StyleSheet.create({
  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 6,
  },
});
