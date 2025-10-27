import DescriptionBold from "@/components/ui/DescriptionBold";
import { LOGIN_XL_DESCRIPTION } from "@/constants/app.constant";
import { Colors } from "@/constants/theme";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

function AuthXLSlide() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={styles.infoContainer}>
      <Text style={[styles.brand, { color: theme.primary }]}>
        Get Live. Stay Informed.
      </Text>
      <DescriptionBold
        style={[styles.infoText, { color: theme.textSecondary }]}
      >
        {LOGIN_XL_DESCRIPTION}
      </DescriptionBold>
    </View>
  );
}

export default AuthXLSlide;

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 40,
    maxWidth: 400,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "left",
    marginTop: 1,
  },
  brand: {
    fontSize: 32,
    fontFamily: "Montserrat_500Medium",
    fontWeight: "700",
    marginBottom: 12,
  },
});
