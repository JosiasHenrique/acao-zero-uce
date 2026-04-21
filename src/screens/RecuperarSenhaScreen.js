import { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from "react-native";

import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

export default function RecuperarSenhaScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Digite seu e-mail";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Digite um e-mail válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEnviarCodigo = async () => {
    if (!validate()) return;

    // --- CÓDIGO TEMPORÁRIO PARA TESTAR O VISUAL ---
    navigation.navigate("ConfirmarCodigo", { email: email });
    return;
    

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      Alert.alert("Sucesso", "Código enviado para o e-mail.");
      
      navigation.navigate("ConfirmarCodigo",{email:email});

    } catch (error) {
      Alert.alert("Erro", "Falha ao enviar código.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}> 
      <View style={styles.header}>
        <Text style={styles.headerTitle}>UNIFAE Care</Text>
      </View>

      <View style={styles.content}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>Recuperar Senha</Text>

        <Text style={styles.subtitle}>
          Insira seu e-mail para receber um código de 8 dígitos para redefinir sua conta.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>ENDEREÇO DE E-MAIL</Text>

          <InputField
            icon="mail-outline"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={errors.email}
          />

          <PrimaryButton
            title="Enviar Código de Recuperação"
            onPress={handleEnviarCodigo}
            loading={loading}
          />

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.voltar}>← Voltar ao Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <View style={styles.infoHeader}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>i</Text>
            </View>
            <Text style={styles.infoTitle}>Informação Importante</Text>
          </View>

          <Text style={styles.infoText}>
            Por motivos de segurança, o código de recuperação expira em 15 minutos.
            Verifique sua caixa de spam caso não receba o e-mail em instantes.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>PRIVACIDADE</Text>
          <Text style={styles.footerLink}>TERMOS</Text>
          <Text style={styles.footerLink}>ACESSIBILIDADE</Text>
        </View>

        <Text style={styles.footerText}>
          © 2024 UNIFAE CARE. CLINICAL EDITORIAL SYSTEM.
        </Text>
      </View>
    </View>
  );
}

const PRIMARY = "#33b8af";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    paddingTop: 50,
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 20,
  },

  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 20,
    resizeMode: "contain",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#1A1A1A",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "#6B6B6B",
    marginBottom: 30,
    lineHeight: 20,
  },

  card: {
    backgroundColor: "#F5F5F5",
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },

  label: {
    fontSize: 12,
    color: "#555",
    marginBottom: 8,
    letterSpacing: 1,
  },

  voltar: {
    textAlign: "center",
    marginTop: 20,
    color: PRIMARY,
    fontWeight: "600",
  },

  infoBox: {
    backgroundColor: "#F1F3F2",
    borderRadius: 12,
    padding: 16,
    marginTop: 30,
    borderLeftWidth: 4,
    borderLeftColor: PRIMARY,
  },

  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  infoIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  infoIconText: {
    color: "#FFF",
    fontWeight: "700",
  },

  infoTitle: {
    fontWeight: "600",
    fontSize: 14,
    color: "#1A1A1A",
  },

  infoText: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },

  footer: {
    alignItems: "center",
    paddingBottom: 20,
  },

  footerText: {
    fontSize: 12,
    color: "#8A8A8A",
    textAlign: "center",
    marginTop: 10,
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