import { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Digite seu e-mail";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Digite um e-mail válido";
    }

    if (!senha.trim()) {
      newErrors.senha = "Digite sua senha";
    } else if (senha.length < 6) {
      newErrors.senha = "Mínimo de 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const emailKey = email.toLowerCase().trim();
      const userJSON = await AsyncStorage.getItem(emailKey);

      if (userJSON !== null) {
        await AsyncStorage.setItem("currentUser", userJSON);
        navigation.replace("Main");
      } else {
        Alert.alert("Acesso Negado", "E-mail não encontrado.");
      }
    } catch {
      Alert.alert("Erro", "Problema ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>Bem-vindo ao UNIFAE Care</Text>
        <Text style={styles.subtitle}>
          Entre com suas credenciais para continuar.
        </Text>

        <Text style={styles.label}>E-mail</Text>
        <InputField
          icon="mail-outline"
          placeholder="nome@exemplo.com.br"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={errors.email}
        />

        <Text style={styles.label}>Senha</Text>
        <InputField
          icon="lock-closed-outline"
          placeholder="••••••••"
          value={senha}
          onChangeText={setSenha}
          secure
          error={errors.senha}
        />

        <TouchableOpacity onPress={() => navigation.navigate("RecuperarSenha")}>
          <Text style={styles.recover}>RECUPERAR SENHA</Text>
        </TouchableOpacity>

        <PrimaryButton
          title="Entrar"
          // onPress={handleLogin}
          onPress={() => navigation.navigate("Main")}
          loading={loading}
        />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Não possui uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
            <Text style={styles.registerLink}>Cadastre-se agora</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 UNIFAE CARE. CLINICAL EDITORIAL SYSTEM.
        </Text>

        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>PRIVACIDADE</Text>
          <Text style={styles.footerLink}>TERMOS</Text>
          <Text style={styles.footerLink}>ACESSIBILIDADE</Text>
        </View>
      </View>
    </View>
  );
}

const PRIMARY = "#33b8af";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
  },

  content: {
    paddingHorizontal: 24,
    marginTop: 60,
  },

  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 20,
    resizeMode: "contain",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#1A1A1A",
    marginBottom: 6,
  },

  subtitle: {
    textAlign: "center",
    color: "#6B6B6B",
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
  },

  recover: {
    color: PRIMARY,
    fontWeight: "600",
    textAlign: "right",
    marginBottom: 24,
  },

  registerContainer: {
    alignItems: "center",
    marginTop: 30,
  },

  registerText: {
    color: "#6B6B6B",
  },

  registerLink: {
    color: PRIMARY,
    fontWeight: "600",
    marginTop: 4,
  },

  footer: {
    alignItems: "center",
    paddingBottom: 20,
  },

  footerText: {
    fontSize: 12,
    color: "#8A8A8A",
    textAlign: "center",
    marginBottom: 10,
  },

  footerLinks: {
    flexDirection: "row",
    gap: 20,
  },

  footerLink: {
    fontSize: 12,
    color: "#8A8A8A",
  },
});