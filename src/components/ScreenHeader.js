import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ScreenHeader({ 
  title = "UNIFAE Care",
  showBackButton = false, 
  rightElement = null 
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.sideContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.sideContainerRight}>
        {rightElement}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  sideContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  sideContainerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  backButton: {
    padding: 4, 
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "center",
  },
});