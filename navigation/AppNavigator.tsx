import LoginScreen from "@/app/(auth)/screens/LoginScreen";
import HomeAuth from "@/features/auth/HomeAuth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  HomeAuth: undefined;
  Register: undefined;
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeAuth"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeAuth" component={HomeAuth} />
        <Stack.Screen name="SignIn" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
