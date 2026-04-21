import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from "react-native";

import InputField from "../components/InputField";

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
  }

  const handleAtualizarSenha = async () => {
    if (codigo.trim().length === 0) {
      return mostrarErro("O CÓDIGO DE VERIFICAÇÃO É OBRIGATÓRIO.");
    }
    if (novaSenha !== confirmarSenha || novaSenha.length === 0) {
      return mostrarErro("AS SENHAS DIGITADAS NÃO COINCIDEM.\nTENTE NOVAMENTE.");
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
        confirmPassword: confirmarSenha
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
          { text: "Fazer Login", onPress: () => navigation.navigate("Login") }
        ]);
      } else {
        mostrarErro(data.message?.toUpperCase() || "FALHA AO REDEFINIR SENHA. TENTE NOVAMENTE.");
      }

    } catch (error) {
      mostrarErro("FALHA DE CONEXÃO COM O SERVIDOR.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.headerIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>UNIFAE Care</Text>
      </View>

      <View style={styles.content}>
        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
        </View>

        {/* TÍTULO E SUBTÍTULO */}
        <Text style={styles.title}>Recuperação de Acesso</Text>
        <Text style={styles.subtitle}>
          Redefina sua senha para continuar acessando seus dados clínicos e acadêmicos com total segurança.
        </Text>

        {/* DICA DE SEGURANÇA */}
        <View style={styles.tipBox}>
          <View style={styles.tipHeader}>
            <Text style={styles.tipIcon}>🛡</Text>
            <Text style={styles.tipTitle}>DICA DE SEGURANÇA</Text>
          </View>
          <Text style={styles.tipText}>
            Use ao menos 8 caracteres, incluindo letras maiúsculas, números e um símbolo especial.
          </Text>
        </View>

        {/* FORMULÁRIO (CARD) */}
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

          <TouchableOpacity 
            style={styles.btnAtualizar} 
            onPress={handleAtualizarSenha}
            disabled={loading}
          >
            <Text style={styles.btnAtualizarIcon}>↺</Text>
            <Text style={styles.btnAtualizarText}>
              {loading ? "Aguarde..." : "Atualizar Senha"}
            </Text>
          </TouchableOpacity>

          {/* CAIXA DE ERRO (Condicional) */}
          {erroAtivo && (
            <View style={styles.errorBox}>
              <View style={styles.errorIconContainer}>
                <Text style={styles.errorIconText}>!</Text>
              </View>
              <Text style={styles.errorText}>
                {mensagemErro}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* FOOTER */}
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
    </ScrollView>
  );
}

// Cores atualizadas para combinar com a tela
const PRIMARY = "#33b8af"; 
const LIGHT_BG = "#FFFFFF"; 
const ERROR_BG = "#FCE8E8";
const ERROR_TEXT = "#D32F2F";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LIGHT_BG },
  header: { flexDirection: "row", alignItems: "center", paddingTop: 50, paddingHorizontal: 20, paddingBottom: 10 },
  backButton: { marginRight: 10 },
  headerIcon: { fontSize: 24, color: "#1A1A1A", fontWeight: "bold" },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#1A1A1A" },
  content: { paddingHorizontal: 24 },
  
  logoContainer: { 
    width: 80, 
    height: 80, 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 20, 
    marginBottom: 20,
    alignSelf: "center"
  },
  logo: { width: 80, height: 80, resizeMode: "contain" },
  
  title: { fontSize: 22, fontWeight: "700", textAlign: "center", color: "#1A1A1A", marginBottom: 10 },
  subtitle: { textAlign: "center", color: "#6B6B6B", marginBottom: 30, lineHeight: 20 },
  
  tipBox: { backgroundColor: "#F1F3F2", borderRadius: 8, padding: 16, borderLeftWidth: 4, borderLeftColor: PRIMARY, marginBottom: 20 },
  tipHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  tipIcon: { fontSize: 14, color: PRIMARY, marginRight: 6 },
  tipTitle: { fontSize: 12, fontWeight: "700", color: PRIMARY, letterSpacing: 0.5 },
  tipText: { fontSize: 13, color: "#555", lineHeight: 18 },
  
  formCard: { backgroundColor: "#F5F5F5", borderRadius: 12, padding: 20, marginBottom: 30 },
  labelRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  label: { fontSize: 12, color: "#555", marginBottom: 8, letterSpacing: 1, marginTop: 10 },
  
  // Cor alterada para ficar mais parecida com a imagem do protótipo
  labelRed: { fontSize: 10, fontWeight: "700", color: "#A02B4E" },
  
  btnAtualizar: { backgroundColor: PRIMARY, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 14, borderRadius: 8, marginTop: 20 },
  btnAtualizarIcon: { color: "#FFF", fontSize: 18, marginRight: 8, fontWeight: "bold" },
  btnAtualizarText: { color: "#FFF", fontSize: 15, fontWeight: "700" },
  
  errorBox: { flexDirection: "row", alignItems: "center", backgroundColor: ERROR_BG, padding: 14, borderRadius: 8, marginTop: 16 },
  errorIconContainer: { width: 20, height: 20, borderRadius: 10, backgroundColor: ERROR_TEXT, alignItems: "center", justifyContent: "center", marginRight: 10 },
  errorIconText: { color: "#FFF", fontSize: 12, fontWeight: "bold" },
  errorText: { color: ERROR_TEXT, fontSize: 11, fontWeight: "600", flex: 1, lineHeight: 16 },
  
  footer: { alignItems: "center", paddingBottom: 30, marginTop: 10 },
  footerLinks: { flexDirection: "row", gap: 20, marginBottom: 10 },
  footerLink: { fontSize: 12, color: "#8A8A8A" },
  footerText: { fontSize: 12, color: "#8A8A8A", textAlign: "center" },
});