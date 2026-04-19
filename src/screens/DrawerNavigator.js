import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();
const PRIMARY = "#33b8af";

export default function DrawerNavigator() {
  const navigation = useNavigation();

  const fazerLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        onPress: async () => {
          await AsyncStorage.removeItem("currentUser");
          navigation.replace("Login");
        },
      },
    ]);
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 0,
        },
        headerTintColor: "#1A1A1A",

        drawerStyle: {
          backgroundColor: "#FFFFFF",
        },

        drawerActiveTintColor: PRIMARY,
        drawerInactiveTintColor: "#6B6B6B",

        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "500",
        },

        headerRight: () => (
          <TouchableOpacity
            onPress={fazerLogout}
            style={{ marginRight: 15 }}
          >
            <Text
              style={{
                color: PRIMARY,
                fontWeight: "600",
                fontSize: 15,
              }}
            >
              Sair
            </Text>
          </TouchableOpacity>
        ),
      }}
    >
    </Drawer.Navigator>
  );
}