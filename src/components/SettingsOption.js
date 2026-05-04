import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function SettingsOption({ title, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <View style={styles.optionLeft}>
        <View style={styles.iconCircle}>
          <Icon name={icon} size={22} color="#33b8af" />
        </View>
        <Text style={styles.optionText}>{title}</Text>
      </View>
      <Icon name="chevron-forward" size={22} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    marginHorizontal: 15,
    marginTop: 12,
    padding: 18,
    borderRadius: 20,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconCircle: {
    backgroundColor: "#EAEAEA",
    padding: 10,
    borderRadius: 30,
  },
  optionText: {
    fontSize: 16,
  },
});