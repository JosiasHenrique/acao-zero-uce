import { View, Text, StyleSheet } from "react-native";

export default function ExercicioStep({
  number,
  title,
  text,
  active,
}) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={[styles.circle, active && styles.circleActive]}>
          <Text style={[styles.number, active && styles.numberActive]}>
            {number}
          </Text>
        </View>

        {number !== "3" && <View style={styles.line} />}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    minHeight: 170,
  },

  left: {
    width: 54,
    alignItems: "center",
  },

  circle: {
    width: 51,
    height: 51,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "#33b8af",
    alignItems: "center",
    justifyContent: "center",
  },

  circleActive: {
    backgroundColor: "#33b8af",
  },

  number: {
    color: "#33b8af",
    fontWeight: "700",
  },

  numberActive: {
    color: "#FFF",
  },

  line: {
    flex: 1,
    width: 2,
    backgroundColor: "#E8E8E8",
  },

  content: {
    flex: 1,
    paddingLeft: 22,
    paddingTop: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },

  text: {
    fontSize: 17,
    lineHeight: 28,
  },
});