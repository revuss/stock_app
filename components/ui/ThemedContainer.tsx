import { Colors } from "@/constants/theme";
import React, { ReactNode } from "react";
import { StyleSheet, View, ViewStyle, useColorScheme } from "react-native";

type ThemedContainerProps = {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  padded?: boolean;
  centered?: boolean;
};

const ThemedContainer = ({
  children,
  style,
  padded = true,
  centered = true,
}: ThemedContainerProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View
      style={[
        styles.base,
        { backgroundColor: theme.background },
        padded && styles.padded,
        centered && styles.centered,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: 24,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ThemedContainer;
