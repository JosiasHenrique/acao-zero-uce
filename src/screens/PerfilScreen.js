import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from "react-native";

import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

export default function PerfilScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.headerIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>UNIFAE Care</Text>
        </View>

        <View style={styles.content}>
            <View style={styles.logoContainer}>
                <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
                />
            </View>
            <Text style={styles.title}>Cristiane Imamura</Text>
            <Text style={styles.subtitle}>
                ID:#8829-REHAB
            </Text>
        </View>

        <View style={styles.formCard}>
            <Text style={styles.label}>FISIOTERAPEUTA RESPONSÁVEL</Text>

            <Text style={styles.label}>COORDENADOR RESPONSÁVEL</Text>

            <View style={styles.tipBox}>
                <View style={styles.tipHeader}>
                    <Text style={styles.tipTitle}>Meta Semanal</Text>
                </View>
                <Text style={styles.tipText}>
                85% concluído
                </Text>
            </View>
        </View>
        
        <Text style={styles.footerLink}>CONFIGURAÇÕES E SUPORTE</Text>
        <View style={styles.formCard}>
            <Text style={styles.footerLink}>Lembretes</Text>
        </View>
        <View style={styles.formCard}>
            <Text style={styles.footerLink}>Notificações</Text>
        </View>
        <View style={styles.formCard}>
            <Text style={styles.footerLink}>Privacidade de Dados</Text>
        </View>

        <PrimaryButton
        title="Sair"
        onPress={() => navigation.navigate("Login")}
        />
        <Text style={styles.footerLink}>V2.4.0</Text>

        <View style={styles.footer}>
            <View style={styles.footerLinks}>
                <Text style={styles.footerLink}>INÍCIO</Text>
                <Text style={styles.footerLink}>AGENDA</Text>
                <Text style={styles.footerLink}>PROGRESSO</Text>
                <Text style={styles.footerLink}>PERFIL</Text>
            </View>
        </View>
    </ScrollView>
  );
}


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

  tipBox: { backgroundColor: "#F1F3F2", borderRadius: 8, padding: 16, borderLeftWidth: 4, borderLeftColor: PRIMARY, marginBottom: 10 },
  tipHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  tipIcon: { fontSize: 14, color: PRIMARY, marginRight: 6 },
  tipTitle: { fontSize: 12, fontWeight: "700", color: PRIMARY, letterSpacing: 0.5 },
  tipText: { fontSize: 13, color: "#555", lineHeight: 18 },

  formCard: { backgroundColor: "#F5F5F5", borderRadius: 12, padding: 20, marginLeft: 15, marginRight: 15, marginBottom: 10, borderRadius: 20 },
  labelRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  label: { fontSize: 12, color: "#555", marginBottom: 8, letterSpacing: 1, marginTop: 10 },

  labelRed: { fontSize: 10, fontWeight: "700", color: "#A02B4E" },

  errorBox: { flexDirection: "row", alignItems: "center", backgroundColor: ERROR_BG, padding: 14, borderRadius: 8, marginTop: 16 },
  errorIconContainer: { width: 20, height: 20, borderRadius: 10, backgroundColor: ERROR_TEXT, alignItems: "center", justifyContent: "center", marginRight: 10 },
  errorIconText: { color: "#FFF", fontSize: 12, fontWeight: "bold" },
  errorText: { color: ERROR_TEXT, fontSize: 11, fontWeight: "600", flex: 1, lineHeight: 16 },

  footer: { alignItems: "center", paddingBottom: 30, marginTop: 10 },
  footerLinks: { flexDirection: "row", gap: 20, marginBottom: 10 },
  footerLink: { fontSize: 12, color: "#8A8A8A" },
  footerText: { fontSize: 12, color: "#8A8A8A", textAlign: "center" },
});