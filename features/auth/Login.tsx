import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import * as Yup from "yup";

import CustomToast from "@/components/ui/CustomToast";
import DescriptionBold from "@/components/ui/DescriptionBold";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedContainer from "@/components/ui/ThemedContainer";
import ThemedTextInput from "@/components/ui/ThemedTextInput";
import TitleHead from "@/components/ui/TitleHead";
import TitleText from "@/components/ui/TitleText";
import {
  CREATE_ACCOUNT,
  LOGIN_DESCRIPTION,
  NEW_TO_COMPANY,
} from "@/constants/app.constant";
import { Colors } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { loginSuccess } from "@/store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import AuthFooter from "./AuthFooter";
import AuthXLSlide from "./AuthXLSlide";
import { saveAuthToken } from "./authFunctions";

interface LoginFormData {
  email: string;
  password: string;
}

const schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
}).required();

const Login: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 800;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const existingUsers = await AsyncStorage.getItem("dummy_users");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      // Find user by matching email and password
      const userLoggedIn = users.find(
        (user: { email: string; password: string }) =>
          user.email === data.email && user.password === data.password
      );

      if (userLoggedIn) {
        console.log("user", userLoggedIn);
        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: `Welcome back, ${userLoggedIn.email}!`,
        });

        await saveAuthToken(JSON.stringify(userLoggedIn));
        dispatch(loginSuccess(userLoggedIn));
        await AsyncStorage.setItem(
          "current_user",
          JSON.stringify(userLoggedIn)
        );
        setTimeout(() => {
          navigation.navigate("home");
        }, 1000);
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: "Invalid email or password. Please try again.",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <ThemedContainer style={styles.root}>
      <CustomToast />
      <View style={[styles.container, isLargeScreen && styles.row]}>
        {isLargeScreen && <AuthXLSlide />}

        <View style={styles.formContainer}>
          <TitleHead>Stocker Live</TitleHead>
          <DescriptionBold style={[styles.subtitle, { color: theme.primary }]}>
            {LOGIN_DESCRIPTION}
          </DescriptionBold>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, onBlur } }) => (
              <ThemedTextInput
                name="email"
                control={control}
                placeholder="Email address"
                keyboardType="email-address"
                error={errors.email}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <ThemedTextInput
                name="password"
                control={control}
                placeholder="Password"
                secureTextEntry
                error={errors.password}
              />
            )}
          />

          <View style={styles.buttonContainer}>
            <ThemedButton
              title={isSubmitting ? "Signing In..." : "Login"}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              textStyle={{ color: theme.background }}
            />
          </View>
          {isSubmitting && (
            <ActivityIndicator
              style={{ marginTop: 16 }}
              color={theme.primary}
            />
          )}

          <TitleText
            style={[styles.footerText, { color: theme.textSecondary }]}
          >
            {NEW_TO_COMPANY}{" "}
            <Text
              style={{ color: theme.primary }}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              {CREATE_ACCOUNT}
            </Text>
          </TitleText>
        </View>
        <AuthFooter />
      </View>
    </ThemedContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 60,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
  },
  logo: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 32,
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 4,
  },
});
