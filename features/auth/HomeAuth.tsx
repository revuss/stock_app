import DescriptionText from "@/components/ui/DescriptionText";
import HorizontalScrollPager from "@/components/ui/HorizontalScrollPager";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedContainer from "@/components/ui/ThemedContainer";
import TitleText from "@/components/ui/TitleText";
import { AUTH_SLIDES } from "@/constants/app.constant";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { router, useNavigation } from "expo-router";
import { Dimensions, Image, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

const HomeAuth = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ThemedContainer padded={false} centered={false}>
      <View style={styles.topContentWrapper}>
        <View style={styles.illustrationContainer}>
          <Image
            source={require("@/assets/images/bull.png")}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <HorizontalScrollPager
          data={AUTH_SLIDES}
          renderItem={({ item }) => (
            <View style={styles.textSlide}>
              <TitleText style={{ maxWidth: width * 0.85 }}>
                {item.title}
              </TitleText>
              <DescriptionText style={{ maxWidth: width * 0.85 }}>
                {item.description}
              </DescriptionText>
            </View>
          )}
          style={styles.textWrapper}
        />
      </View>

      <View style={styles.buttonContainer}>
        <ThemedButton title="Register" type="filled" />
        <ThemedButton
          title="Sign in"
          type="outlined"
          onPress={() => {
            router.push("/screens/LoginScreen");
          }}
        />
      </View>
    </ThemedContainer>
  );
};

export default HomeAuth;

const styles = StyleSheet.create({
  topContentWrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  textWrapper: {
    marginBottom: 50,
  },
  illustrationContainer: {
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  illustration: {
    width: width * 0.6,
    height: height * 0.4,
  },
  textSlide: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    height: height * 0.25,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 30,
  },
});
