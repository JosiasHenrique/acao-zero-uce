import Svg, { Circle } from "react-native-svg";
import { View, Text, StyleSheet } from "react-native";

export default function ProgressCircle({ percent }) {

  const radius = 36;
  const strokeWidth = 7;
  const circumference = 2 * Math.PI * radius;

  const progress =
    circumference - (circumference * percent) / 100;

  return (
    <View style={styles.container}>

      <Svg width={90} height={90}>

        {/* fundo */}
        <Circle
          stroke="#E0E0E0"
          fill="none"
          cx="45"
          cy="45"
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* progresso */}
        <Circle
          stroke="#33b8af"
          fill="none"
          cx="45"
          cy="45"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          rotation="-90"
          origin="45,45"
        />

      </Svg>

      <Text style={styles.text}>{percent}%</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    justifyContent:"center",
    alignItems:"center",
  },

  text:{
    position:"absolute",
    fontSize:20,
    fontWeight:"700",
    color:"#33b8af",
  }
});