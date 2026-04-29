import { View, Text, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Text>Home</Text>

      <PrimaryButton
        title="Iniciar Exercício"
      />

      <View style={styles.metaCard}>
        <Text style={styles.metaLabel}>Seu progresso</Text>
        <Text style={styles.metaPercent}>85%</Text>
        
        <View style={styles.metaRow}>

          <Text style={styles.metaDone}> Você está indo muito bem</Text>
          <Text style={styles.metaDone}> Continue assim 💚</Text>
        </View>

        <View style={styles.progressBackground}>
          <View style={styles.progressFill} />
        </View>
    </View>
  </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#FFF",
    justifyContent: "center",
  },

  metaCard: {
    marginTop: 25,
    backgroundColor: "#E6EFE6",
    padding: 20,
    borderRadius: 20,
  },

  metaLabel: {
    color: "#33b8af",
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 10,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  metaPercent: {
    fontSize: 48,
    fontWeight: "800",
    color: "#33b8af",
  },

  metaDone: {
    fontSize: 18,
    color: "#33b8af",
    marginBottom: 8,
  },

  progressBackground: {
    height: 10,
    backgroundColor: "#DADADA",
    borderRadius: 10,
    marginTop: 15,
    overflow: "hidden",
  },

  progressFill: {
    width: "85%",
    height: "100%",
    backgroundColor: "#33b8af",
  },
});