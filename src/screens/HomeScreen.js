import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import ProgressCircle from "../components/ProgressCircle";

export default function HomeScreen() {

  const progresso = 78;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroContainer}>

        <Image
          source={require("../../assets/paciente.jpg")}
          style={styles.heroImage}
        />

        <View style={styles.overlay} />

        <View style={styles.heroContent}>
          <View>
            <Text style={styles.hello}>Olá, Ana!</Text>
            <Text style={styles.subtitle}>
              Seu cuidado diário faz toda a diferença na sua recuperação.
            </Text>
          </View>

          <Ionicons name="notifications-outline" size={26} color="#000" />
        </View>

      </View>

      <View style={styles.planCard}>

        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>Seu plano de hoje</Text>
          <Text style={styles.exerciseCount}>1 exercício</Text>
        </View>

        <View style={styles.exerciseCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.exerciseName}>
              Mobilidade de Ombro
            </Text>

            <Text style={styles.exerciseDesc}>
              Pós-cirúrgico • Câncer de mama
            </Text>

            <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={16} color="#555" />
              <Text style={styles.time}> 12 min</Text>
            </View>
          </View>

          <Image
            source={require("../../assets/exercicio.jpg")}
            style={styles.exerciseImage}
          />
        </View>

        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startText}>Iniciar exercício</Text>
        </TouchableOpacity>

      </View>

      {/* PROGRESSO */}
      <View style={styles.progressCard}>

        <Text style={styles.progressTitle}>Seu progresso</Text>

        <View style={styles.progressRow}>
          <ProgressCircle percent={progresso} />

          <View style={{ flex: 1 }}>
            <Text style={styles.progressMsg}>
              Você está indo muito bem!
            </Text>

            <Text style={styles.progressSub}>
              Continue assim 💚
            </Text>
          </View>
        </View>

      </View>

    </ScrollView>
  );
}

const PRIMARY = "#33b8af";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },

  /* HERO */
  heroContainer: {
    height: 320,
  },

  heroImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.47)",
  },

  heroContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  hello: {
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 6,
    color: "#070707ff",
    width: 230,
  },

  /* CARD PLANO */
  planCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 15,
    marginTop: -60,
    borderRadius: 25,
    padding: 20,
    elevation: 4,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  exerciseCount: {
    color: PRIMARY,
    fontWeight: "600",
  },

  exerciseCard: {
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    padding: 15,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  exerciseName: {
    fontSize: 17,
    fontWeight: "700",
  },

  exerciseDesc: {
    color: "#666",
    marginTop: 5,
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  time: {
    color: "#555",
  },

  exerciseImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },

  startButton: {
    backgroundColor: PRIMARY,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  startText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },

  /* PROGRESSO */
  progressCard: {
    backgroundColor: "#FFF",
    margin: 15,
    borderRadius: 25,
    padding: 20,
  },

  progressTitle: {
    fontWeight: "600",
    marginBottom: 15,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  progressMsg: {
    fontWeight: "600",
    fontSize: 16,
  },

  progressSub: {
    color: "#666",
    marginTop: 5,
  },

});