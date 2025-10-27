import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  ALREADY_ACCOUNT,
  LOGIN,
  LOGIN_DESCRIPTION,
} from "@/constants/app.constant";
import { Colors } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import AuthFooter from "./AuthFooter";
import AuthXLSlide from "./AuthXLSlide";

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
}).required();

const Register: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 800;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newUser = {
        email: data?.email,
        password: data?.password,
        registeredAt: new Date().toISOString(),
      };
      const existingUsers = await AsyncStorage.getItem("dummy_users");
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      const userExists = users.some((u: any) => u.email === newUser.email);
      if (userExists) {
        Toast.show({
          type: "info",
          text1: "Duplicate 🛑",
          text2: "User already registered, try logging in instead",
        });
        return;
      }
      users.push(newUser);
      await AsyncStorage.setItem("dummy_users", JSON.stringify(users));
      Toast.show({
        type: "success",
        text1: "Registration successful 🎉",
        text2: "Your account has been created locally.",
      });
      setTimeout(() => {
        navigation.navigate("SignIn");
      }, 3000);
    } catch (error) {
      console.error("Error storing user data:", error);
      alert("Error occured while registering user!");
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

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value, onBlur } }) => (
              <ThemedTextInput
                name="confirmPassword"
                control={control}
                placeholder="Confirm Password"
                secureTextEntry
                error={errors.confirmPassword}
              />
            )}
          />

          <View style={styles.buttonContainer}>
            <ThemedButton
              title={isSubmitting ? "Signing Un..." : "Register"}
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
            {ALREADY_ACCOUNT}{" "}
            <Text
              style={{ color: theme.primary }}
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              {LOGIN}
            </Text>
          </TitleText>
        </View>
        <AuthFooter />
      </View>
    </ThemedContainer>
  );
};

export default Register;

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
