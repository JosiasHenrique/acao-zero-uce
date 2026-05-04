import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function AuthFooter() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        © 2024 UNIFAE CARE. CLINICAL EDITORIAL SYSTEM.
      </Text>

      <View style={styles.footerLinks}>
        <TouchableOpacity>
          <Text style={styles.footerLink}>PRIVACIDADE</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerLink}>TERMOS</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerLink}>ACESSIBILIDADE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: "center",
    paddingBottom: 20,
    marginTop: "auto",
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