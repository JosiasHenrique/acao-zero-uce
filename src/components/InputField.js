import { View, TextInput, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function InputField({
  icon,
  placeholder,
  value,
  onChangeText,
  secure = false,
  error,
  keyboardType = "default",
}) {
  return (
    <View style={{ marginBottom: 12 }}>
      <View style={[styles.container, error && styles.errorBorder]}>
        <Ionicons name={icon} size={18} color="#7A7A7A" />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A7A7A7"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: "#000",
  },

  errorBorder: {
    borderWidth: 1,
    borderColor: "#FF4D4D",
  },

  errorText: {
    color: "#FF4D4D",
    fontSize: 12,
    marginTop: 4,
  },
});