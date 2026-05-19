import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ExerciseCard({ title, description, time, image }) {

  const imageSource = typeof image === 'string' ? { uri: image } : image;

  return (
    <View style={styles.exerciseCard}>
      <View style={styles.infoContainer}>
        {/* Usamos as props que vêm da Home */}
        <Text style={styles.exerciseName}>{title || "Sem título"}</Text>
        <Text style={styles.exerciseDesc}>{description || "Sem descrição"}</Text>

        <View style={styles.timeRow}>
          <Ionicons name="time-outline" size={16} color="#555" />
          <Text style={styles.time}> {time || "10 min"}</Text>
        </View>
      </View>

      <Image source={imageSource} style={styles.exerciseImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseCard: {
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    padding: 15,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  exerciseDesc: {
    color: "#666",
    marginTop: 5,
    fontSize: 13,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  time: {
    color: "#555",
    fontSize: 14,
  },
  exerciseImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    borderRadius: 12,
  },
});