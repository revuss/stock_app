import { Colors } from "@/constants/theme";
import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";

interface ThemedTextInputProps {
  name: string;
  control: Control<any>;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "numeric";
  secureTextEntry?: boolean;
  error?: FieldError;
}

const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
  name,
  control,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  error,
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              {
                borderColor: error ? theme.primary : theme.border,
                backgroundColor:
                  colorScheme === "light"
                    ? "rgba(244,157,110,0.08)"
                    : "rgba(255,255,255,0.06)",
                color: theme.text,
              },
            ]}
            placeholder={placeholder}
            placeholderTextColor={theme.textSecondary}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {error && (
        <Text style={[styles.errorText, { color: theme.primary }]}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

export default ThemedTextInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    fontFamily: "Montserrat_500Medium",
    marginBottom: 14,
  },
  input: {
    borderWidth: 1.3,
    borderRadius: 10,
    fontFamily: "Montserrat_500Medium",
    padding: Platform.OS === "web" ? 14 : 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 13,
    fontFamily: "Montserrat_400Regular",
    marginTop: 4,
    marginLeft: 4,
  },
});
