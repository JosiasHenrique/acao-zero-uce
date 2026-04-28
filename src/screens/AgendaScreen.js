import { View, Text, StyleSheet } from "react-native";

export default function AgendaScreen() {

  return (
    <View style={styles.container}>
      <Text>Agenda</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:"#FFF" },
});