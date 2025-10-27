import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import Toast from "react-native-toast-message";

interface ToastConfigProps {
  text1?: string;
  text2?: string;
}

const CustomToast: React.FC = () => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <Toast
      position="top"
      topOffset={70}
      visibilityTime={2500}
      config={{
        success: ({ text1, text2 }: ToastConfigProps) => (
          <ToastCard
            text1={text1}
            text2={text2}
            borderColor={themeColors.primary}
            themeColors={themeColors}
          />
        ),
        error: ({ text1, text2 }: ToastConfigProps) => (
          <ToastCard
            text1={text1}
            text2={text2}
            borderColor={themeColors.error}
            themeColors={themeColors}
          />
        ),
        info: ({ text1, text2 }: ToastConfigProps) => (
          <ToastCard
            text1={text1}
            text2={text2}
            borderColor={themeColors.tint}
            themeColors={themeColors}
          />
        ),
      }}
    />
  );
};

interface ToastCardProps extends ToastConfigProps {
  borderColor: string;
  themeColors: typeof Colors.light;
}

const ToastCard: React.FC<ToastCardProps> = ({
  text1,
  text2,
  borderColor,
  themeColors,
}) => (
  <View
    style={[
      styles.toast,
      {
        backgroundColor: themeColors.card,
        borderColor: themeColors.border,
      },
    ]}
  >
    <View style={[styles.indicator, { backgroundColor: borderColor }]} />
    <View style={styles.textContainer}>
      <Text style={[styles.title, { color: themeColors.text }]}>{text1}</Text>
      {text2 && (
        <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
          {text2}
        </Text>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  toast: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignSelf: "center",
    minWidth: "30%",
    maxWidth: "85%",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  indicator: {
    width: 4,
    height: "100%",
    borderRadius: 2,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
    fontWeight: "600",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Montserrat_500Medium",
    color: Colors?.light?.primary,
    marginTop: 2,
  },
});

export default CustomToast;
