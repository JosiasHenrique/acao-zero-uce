import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";

import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import AuthFooter from "../components/AuthFooter";
import ScreenHeader from "../components/ScreenHeader";
import AlertBox from "../components/AlertBox";

const API_BASE_URL = "http://10.0.2.2:3000/api/v1/auth";

export default function ConfirmarCodigoScreen({ route, navigation }) {
  const emailParam = route?.params?.email || "";

  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [loading, setLoading] = useState(false);
  const [erroAtivo, setErroAtivo] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const mostrarErro = (mensagem) => {
    setErroAtivo(true);
    setMensagemErro(mensagem);
  };

  const handleAtualizarSenha = async () => {
    if (codigo.trim().length === 0) {
      return mostrarErro("O CÓDIGO DE VERIFICAÇÃO É OBRIGATÓRIO.");
    }
    if (novaSenha !== confirmarSenha || novaSenha.length === 0) {
      return mostrarErro(
        "AS SENHAS DIGITADAS NÃO COINCIDEM.\nTENTE NOVAMENTE.",
      );
    }

    setErroAtivo(false);

    // --- CÓDIGO TEMPORÁRIO PARA TESTAR O VISUAL ---
    navigation.navigate("Login");
    return;
    // ----------------------------------------------

    setLoading(true);

    try {
      const payload = {
        email: emailParam,
        code: codigo,
        password: novaSenha,
        confirmPassword: confirmarSenha,
      };

      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok || response.status === 201) {
        Alert.alert("Pronto!", data.message || "Senha alterada com sucesso.", [
          { text: "Fazer Login", onPress: () => navigation.navigate("Login") },
        ]);
      } else {
        mostrarErro(
          data.message?.toUpperCase() ||
            "FALHA AO REDEFINIR SENHA. TENTE NOVAMENTE.",
        );
      }
    } catch (error) {
      mostrarErro("FALHA DE CONEXÃO COM O SERVIDOR.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ScreenHeader showBackButton={true} />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Recuperação de Acesso</Text>
        <Text style={styles.subtitle}>
          Redefina sua senha para continuar acessando seus dados clínicos e
          acadêmicos com total segurança.
        </Text>
        <AlertBox
          type="tip"
          title="DICA DE SEGURANÇA"
          message="Use ao menos 8 caracteres, incluindo letras maiúsculas, números e um símbolo especial."
        />
        <View style={styles.formCard}>
          <Text style={styles.label}>E-MAIL CADASTRADO</Text>
          <InputField
            icon="mail-outline"
            placeholder={emailParam || "nome@unifae.br"}
            value={emailParam}
            editable={false}
          />

          <View style={styles.labelRow}>
            <Text style={styles.label}>CÓDIGO DE VERIFICAÇÃO</Text>
            <Text style={styles.labelRed}>8 DÍGITOS ENVIADOS</Text>
          </View>
          <InputField
            icon="keypad-outline"
            placeholder="0 0 0 0 - 0 0 0 0"
            value={codigo}
            onChangeText={setCodigo}
            autoCapitalize="characters"
          />

          <Text style={styles.label}>NOVA SENHA</Text>
          <InputField
            icon="lock-closed-outline"
            placeholder="••••••••"
            value={novaSenha}
            onChangeText={setNovaSenha}
            secure
          />

          <Text style={styles.label}>CONFIRMAR SENHA</Text>
          <InputField
            icon="shield-checkmark-outline"
            placeholder="••••••••"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secure
          />

          <View style={{ marginTop: 10 }}>
            <PrimaryButton
              title={loading ? "Aguarde..." : "Atualizar Senha"}
              onPress={handleAtualizarSenha}
            />
          </View>
          {erroAtivo && <AlertBox type="error" message={mensagemErro} />}
        </View>
      </View>

      <AuthFooter />
    </ScrollView>
  );
}

const PRIMARY = "#33b8af";
const LIGHT_BG = "#FFFFFF";
const ERROR_BG = "#FCE8E8";
const ERROR_TEXT = "#D32F2F";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LIGHT_BG },
  content: { paddingHorizontal: 24 },

  logoContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  logo: { width: 80, height: 80, resizeMode: "contain" },

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

  formCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    color: "#555",
    marginBottom: 8,
    letterSpacing: 1,
    marginTop: 10,
  },
  labelRed: { fontSize: 10, fontWeight: "700", color: "#A02B4E" },
});