import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function saveAuthToken(token: string) {
  if (Platform.OS === "web") {
    sessionStorage.setItem("authToken", token);
    document.cookie = `authToken=${token}; path=/; max-age=${7 * 24 * 60 * 60}`;
  } else {
    await SecureStore.setItemAsync("authToken", token);
  }
}

export async function getAuthToken() {
  if (Platform.OS === "web") {
    const tokenFromSession = sessionStorage.getItem("authToken");
    if (tokenFromSession) return tokenFromSession;
    const match = document.cookie.match(/(^| )authToken=([^;]+)/);
    return match ? match[2] : null;
  } else {
    return await SecureStore.getItemAsync("authToken");
  }
}

export async function deleteAuthToken() {
  if (Platform.OS === "web") {
    sessionStorage.removeItem("authToken");
    document.cookie = "authToken=; path=/; max-age=0";
  } else {
    await SecureStore.deleteItemAsync("authToken");
  }
}
