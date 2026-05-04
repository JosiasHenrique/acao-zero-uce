import { View, Text, StyleSheet } from "react-native";

export default function AlertBox({ type = "info", title, message }) {
  // --- VARIAÇÃO DE ERRO ---
  if (type === "error") {
    return (
      <View style={styles.errorBox}>
        <View style={styles.errorIconContainer}>
          <Text style={styles.errorIconText}>!</Text>
        </View>
        <Text style={styles.errorText}>{message}</Text>
      </View>
    );
  }

  // --- VARIAÇÃO DE INFO E DICA (TIP) ---
  const isTip = type === "tip";

  return (
    <View style={styles.infoBox}>
      <View style={styles.infoHeader}>
        {isTip ? (
          <Text style={styles.tipIcon}>🛡</Text>
        ) : (
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>i</Text>
          </View>
        )}
        <Text style={[styles.infoTitle, isTip && styles.tipTitle]}>{title}</Text>
      </View>

      <Text style={styles.infoText}>{message}</Text>
    </View>
  );
}

const PRIMARY = "#33b8af";
const ERROR_BG = "#FCE8E8";
const ERROR_TEXT = "#D32F2F";

const styles = StyleSheet.create({
  // Estilos da caixa de Info/Dica
  infoBox: {
    backgroundColor: "#F1F3F2",
    borderRadius: 8, 
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: PRIMARY,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
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
  tipIcon: {
    fontSize: 14,
    color: PRIMARY,
    marginRight: 6,
  },
  infoTitle: {
    fontWeight: "600",
    fontSize: 14,
    color: "#1A1A1A",
  },
  tipTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: PRIMARY,
    letterSpacing: 0.5,
  },
  infoText: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },


  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ERROR_BG,
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  errorIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: ERROR_TEXT,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  errorIconText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  errorText: {
    color: ERROR_TEXT,
    fontSize: 11,
    fontWeight: "600",
    flex: 1,
    lineHeight: 16,
  },
});