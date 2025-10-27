import { Text } from "@react-navigation/elements";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import ThemedButton from "@/components/ui/ThemedButton";
import ThemedContainer from "@/components/ui/ThemedContainer";
import { deleteAuthToken } from "@/features/auth/authFunctions";
import { logout } from "@/store/authSlice";

function HomeScreen() {
  const dispatch = useDispatch();
  // const navigation =
  //   useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    try {
      await deleteAuthToken();
      dispatch(logout());

      // navigation.navigate("HomeAuth");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <ThemedContainer style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Home!</Text>
        <ThemedButton title="Logout" onPress={handleLogout} />
      </View>
    </ThemedContainer>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    gap: 16,
  },
  welcome: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
});
