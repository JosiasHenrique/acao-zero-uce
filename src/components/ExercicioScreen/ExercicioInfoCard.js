import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const PRIMARY = "#33b8af";

export default function ExercicioInfoCard({
  icon,
  label,
  value,
  subtitle,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <View style={styles.iconBox}>
          <Icon name={icon} size={22} color="#FFF" />
        </View>
      </View>

      <Text style={styles.label}>{label}</Text>

      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 20,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  iconWrapper: {
    marginBottom: 18,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888",
    letterSpacing: 1.2,
    marginBottom: 10,
  },

  valueRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  value: {
    fontSize: 36,
    fontWeight: "800",
    color: "#111",
    lineHeight: 40,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginLeft: 8,
    marginBottom: 5,
    fontWeight: "600",
  },
});