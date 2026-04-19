import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PrimaryButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
      <Ionicons name="arrow-forward" size={18} color="#FFF" />
    </TouchableOpacity>
  );
}

const PRIMARY = "#33b8af";
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY,
    padding: 16,
    borderRadius: 12,
    gap: 8,
    elevation: 2,
  },

  disabled: {
    opacity: 0.6,
  },

  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});