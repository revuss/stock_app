import LoginScreen from "@/app/(auth)/screens/LoginScreen";
import RegisterScreen from "@/app/(auth)/screens/RegisterScreen";
import HomeScreen from "@/app/(home)/HomeScreen";
import ThemedContainer from "@/components/ui/ThemedContainer";
import { getAuthToken } from "@/features/auth/authFunctions";
import HomeAuth from "@/features/auth/HomeAuth";
import { loginSuccess, logout } from "@/store/authSlice";
import { RootState } from "@/store/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export type RootStackParamList = {
  HomeAuth: undefined;
  Register: undefined;
  SignIn: undefined;
  home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await getAuthToken();
        if (token) {
          dispatch(loginSuccess(JSON.parse(token)));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log("Token check error:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [dispatch]);

  if (loading) {
    return (
      <ThemedContainer
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </ThemedContainer>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "home" : "HomeAuth"}
      screenOptions={{ headerShown: false, animation: "fade" }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="home" component={HomeScreen} />
      ) : (
        <>
          <Stack.Screen name="HomeAuth" component={HomeAuth} />
          <Stack.Screen name="SignIn" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
