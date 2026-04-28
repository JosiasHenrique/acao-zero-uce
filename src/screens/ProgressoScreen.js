import { View, Text, StyleSheet } from "react-native";

export default function ProgressoScreen() {

  return (
    <View style={styles.container}>
      <Text>Progresso</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:"#FFF" },
});