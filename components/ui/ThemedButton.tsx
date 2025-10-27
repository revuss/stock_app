// components/ui/ThemedButton.tsx
import { Colors } from "@/constants/theme";
import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  ViewStyle,
} from "react-native";

interface ThemedButtonProps {
  title: string;
  type?: "filled" | "outlined";
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  type = "filled",
  onPress,
  style,
  textStyle,
  disabled = false,
}) => {
  const theme = useColorScheme() ?? "light";
  const primaryColor = Colors[theme].primary;
  const backgroundColor = Colors[theme].background;

  const isFilled = type === "filled";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        isFilled
          ? { backgroundColor: primaryColor }
          : {
              borderWidth: 1.5,
              borderColor: primaryColor,
              backgroundColor: "transparent",
            },
        disabled && { opacity: 0.5 },
        style,
      ]}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          isFilled ? { color: backgroundColor } : { color: primaryColor },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 16,
  },
});
