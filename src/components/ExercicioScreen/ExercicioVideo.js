import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

export default function ExercicioVideo() {
  return (
    <TouchableOpacity style={styles.videoBox}>
      <Image
        source={require("../../../assets/paciente.jpg")}
        style={styles.image}
        blurRadius={2}
      />

      <View style={styles.overlay} />

      <View style={styles.playButton}>
        <Icon name="play" size={34} color="#FFF" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  videoBox: {
    height: 203,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#DDD",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  playButton: {
    position: "absolute",
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#33b8af",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
});