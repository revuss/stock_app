import DescriptionText from "@/components/ui/DescriptionText";
import { PRIVACY_TEXT } from "@/constants/app.constant";
import { StyleSheet, View } from "react-native";

function AuthFooter() {
  return (
    <View style={styles.privacyContainer}>
      <DescriptionText style={[styles.privacyText]}>
        {PRIVACY_TEXT}
      </DescriptionText>
    </View>
  );
}

export default AuthFooter;

const styles = StyleSheet.create({
  privacyContainer: {
    textAlign: "center",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  privacyText: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 24,
    lineHeight: 16,
  },
});
