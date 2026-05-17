import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import ExercicioInfoCard from "../components/ExercicioScreen/ExercicioInfoCard";
import ExercicioHeader from "../components/ExercicioScreen/ExercicioHeader";
import ExercicioVideo from "../components/ExercicioScreen/ExercicioVideo";
import ExercicioStep from "../components/ExercicioScreen/ExercicioStep";
import ExercicioTips from "../components/ExercicioScreen/ExercicioTips";


const PRIMARY = "#33b8af";

export default function ExercicioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ExercicioHeader navigation={navigation} />

        <View style={styles.tagsRow}>
          <Text style={styles.tag}>MEMBROS SUPERIORES</Text>
          <Text style={styles.tag}>MOBILIDADE</Text>
        </View>

        <Text style={styles.title}>Rotação Externa de Ombro</Text>

        <ExercicioVideo />

        <View style={styles.cardsRow}>
          <ExercicioInfoCard
            icon="repeat"
            label="SÉRIES"
            value="3"
            subtitle="Unidades"
          />

          <ExercicioInfoCard
            icon="barbell"
            label="VOLUME"
            value="15"
            subtitle="Repetições"
          />
        </View>

        <Text style={styles.sectionTitle}>Passo a Passo</Text>

        <ExercicioStep
          number="1"
          active
          title="Posicionamento"
          text="Mantenha o cotovelo junto ao corpo em um ângulo de 90 graus."
        />

        <ExercicioStep
          number="2"
          active
          title="Movimento"
          text="Gire o antebraço para fora de forma controlada."
        />

        <ExercicioStep
          number="3"
          title="Retorno"
          text="Retorne à posição inicial lentamente."
        />

        <ExercicioTips />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate("Feedback")}
        >
          <Text style={styles.buttonText}>Concluir Atividade</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#FFF",
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },

  tagsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  tag: {
    backgroundColor: PRIMARY,
    color: "#063b37",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "700",
  },

  title: {
    fontSize: 31,
    fontWeight: "800",
    marginTop: 18,
    marginBottom: 30,
  },

  cardsRow: {
    flexDirection: "row",
    gap: 18,
    marginTop: 34,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 36,
    marginBottom: 24,
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    backgroundColor: "#FFF",
  },

  button: {
    height: 62,
    borderRadius: 9,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 19,
    fontWeight: "800",
  },
});