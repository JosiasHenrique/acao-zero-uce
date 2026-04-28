import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import PerfilScreen from "./PerfilScreen";
import AgendaScreen from "./AgendaScreen";
import HomeScreen from "./HomeScreen";
import ProgressoScreen from "./ProgressoScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color }) => {
          let icon;

          if (route.name === "Inicio")
            icon = focused ? "home" : "home-outline";

          if (route.name === "Agenda")
            icon = focused ? "calendar" : "calendar-outline";

          if (route.name === "Progresso")
            icon = focused ? "stats-chart" : "stats-chart-outline";

          if (route.name === "Perfil")
            icon = focused ? "person" : "person-outline";

          return <Icon name={icon} size={22} color={color} />;
        },

        tabBarActiveTintColor: "#33b8af",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Agenda" component={AgendaScreen} />
      <Tab.Screen name="Progresso" component={ProgressoScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}