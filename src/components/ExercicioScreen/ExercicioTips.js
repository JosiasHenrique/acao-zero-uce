import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function ExercicioTips() {
  return (
    <View style={styles.card}>
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.logo}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Dicas da Fisioterapeuta</Text>

        <Text style={styles.text}>
          "Foque na qualidade do movimento."
        </Text>
      </View>

      <Icon
        name="newspaper-outline"
        size={58}
        color="#D8D8D8"
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
    padding: 25,
    flexDirection: "row",
  },

  logo: {
    width: 60,
    height: 60,
  },

  content: {
    flex: 1,
    marginLeft: 18,
  },

  title: {
    fontSize: 17,
    fontWeight: "800",
  },

  text: {
    marginTop: 8,
    fontStyle: "italic",
  },

  icon: {
    position: "absolute",
    right: 18,
    top: 24,
  },
});