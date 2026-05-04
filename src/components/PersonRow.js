import { View, Text, Image, StyleSheet } from "react-native";

export default function PersonRow({ image, name, role }) {
  return (
    <View style={styles.personRow}>
      <Image source={image} style={styles.personImage} />
      <View>
        <Text style={styles.person}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  personRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  personImage: {
    width: 55,
    height: 55,
    borderRadius: 12,
  },
  person: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  role: {
    color: "#777",
    fontSize: 14,
  },
});