import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PerfilScreen from './src/screens/PerfilScreen';
import LoginScreen from './src/screens/LoginScreen';
import RecuperarSenhaScreen from './src/screens/RecuperarSenhaScreen';
import ConfirmarCodigoScreen from './src/screens/ConfirmarCodigoScreen';
import DrawerNavigator from './src/screens/DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, 
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RecuperarSenha" component={RecuperarSenhaScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        {/* NOVA TELA ADICIONADA AQUI */}
        <Stack.Screen name="ConfirmarCodigo" component={ConfirmarCodigoScreen} />
        <Stack.Screen name="Main" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}