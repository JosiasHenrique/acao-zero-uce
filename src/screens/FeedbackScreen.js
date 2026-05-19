import { View, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import apiClient from "../../api/apiClient";
const PRIMARY = "#15803d";

const niveis = [
  {
    emoji: "😊",
    titulo: "Sem Dor/Esforço",
    descricao: "Absolutamente confortável",
    valor: 0,
  },
  {
    emoji: "🙂",
    titulo: "Leve",
    descricao: "Atividade tranquila e sustentável",
    valor: 2,
  },
  {
    emoji: "😐",
    titulo: "Moderado",
    descricao: "Senti o esforço, mas sem dor",
    valor: 5,
  },
  {
    emoji: "😣",
    titulo: "Intenso",
    descricao: "Exigiu bastante concentração",
    valor: 8,
  },
  {
    emoji: "😫",
    titulo: "Exaustão",
    descricao: "Limite físico atingido",
    valor: 10,
  },
];

export default function FeedbackScreen({ navigation, route }) {
  const [selecionado, setSelecionado] = useState(5);
  const [observacao, setObservacao] = useState("");
  const [loading, setLoading] = useState(false);

  const executionId = route.params?.executionId || 901;
console.log("ID da execução recebido na tela de Feedback:", executionId);

  const handleSaveFeedback = async () => {
  if (loading) return;
  setLoading(true);

  try {
    const response = await apiClient.post(`app/home/plan/executions/${executionId}/feedback`, {
      score: selecionado,
      notes: observacao,
    });

    if (response.status === 200 || response.status === 201) {
      Alert.alert("Sucesso!", "Feedback registrado com sucesso!", [
  { 
    text: "OK", 
    onPress: () => {
      navigation.navigate("Main", { screen: "Inicio" });
    }
  }
]);
    }
} catch (error) {
    
    if (error.response) {
      const status = error.response.status;
      if (status === 409) {
        Alert.alert("Aviso", "O feedback para esta sessão já foi enviado.");
      } else if (status === 404) {
        Alert.alert("Erro", "Execução não encontrada.");
      } else {
        Alert.alert("Erro", "Erro ao salvar feedback.");
      }
    } else {
      Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor.");
    }
    console.error("Erro no feedback:", error.response?.data);
  } finally {
    setLoading(false);
  }
};
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color="#166534" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>UNIFAE Care</Text>

          <Image
            source={require("../../assets/logo.png")}
            style={styles.headerLogo}
          />
        </View>

        <Text style={styles.smallTitle}>SESSÃO FINALIZADA</Text>

        <Text style={styles.title}>Como você se sente?</Text>

        <Text style={styles.subtitle}>
          Avalie seu nível de dor e esforço após o exercício para que possamos ajustar seu plano.
        </Text>

        <View style={styles.cardsContainer}>
          {niveis.map((item) => {
            const ativo = selecionado === item.valor;

            return (
              <TouchableOpacity
                key={item.valor}
                style={[
                  styles.card,
                  ativo && styles.cardAtivo,
                ]}
                onPress={() => setSelecionado(item.valor)}
              >
                <View style={styles.cardLeft}>
                  <View style={styles.emojiContainer}>
                    <Text style={styles.emoji}>{item.emoji}</Text>
                  </View>

                  <View>
                    <Text
                      style={[
                        styles.cardTitle,
                        ativo && styles.cardTitleAtivo,
                      ]}
                    >
                      {item.titulo}
                    </Text>

                    <Text style={styles.cardDescricao}>
                      {item.descricao}
                    </Text>
                  </View>
                </View>

                <Text
                  style={[
                    styles.cardValor,
                    ativo && styles.cardValorAtivo,
                  ]}
                >
                  {item.valor}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.observacaoBox}>
          <Text style={styles.observacaoTitulo}>
            Observações Adicionais
          </Text>

          <TextInput
            style={styles.textArea}
            multiline
            placeholder="Descreva qualquer desconforto específico ou comentário sobre os exercícios de hoje..."
            placeholderTextColor="#A3A3A3"
            value={observacao}
            onChangeText={setObservacao}
          />
        </View>

        <View style={styles.banner}>
            <Image
                source={require("../../assets/logo.png")}
                style={styles.bannerBackground}
            />

            <View style={styles.overlay} />

            <View style={styles.bannerContent}>
                <Text style={styles.bannerText}>
                Seu progresso é nossa prioridade.
                </Text>
            </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.button, loading && {opacity:0.7}]} onPress={handleSaveFeedback} disabled={loading}>
          <Text style={styles.buttonText}>Salvar Feedback</Text>
        </TouchableOpacity>
      </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingTop: 30,
  },

  content: {
    paddingHorizontal: 22,
    paddingBottom: 140,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 35,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#33b8af",
  },

  headerLogo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    resizeMode: "contain",
  },

  smallTitle: {
    textAlign: "center",
    color: "#33b8af",
    fontWeight: "700",
    letterSpacing: 2,
    fontSize: 13,
    marginBottom: 12,
  },

  title: {
    textAlign: "center",
    fontSize: 48,
    fontWeight: "800",
    color: "#111",
    lineHeight: 52,
  },

  subtitle: {
    textAlign: "center",
    color: "#444",
    fontSize: 17,
    lineHeight: 32,
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 10,
  },

  cardsContainer: {
    gap: 18,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardAtivo: {
    borderWidth: 2,
    borderColor: "#B7D5B9",
    backgroundColor: "#F8FFF8",
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    flex: 1,
  },

  emojiContainer: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
  },

  emoji: {
    fontSize: 28,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  cardTitleAtivo: {
    color: "#33b8af",
  },

  cardDescricao: {
    marginTop: 4,
    color: "#444",
    fontSize: 14,
    width: 180,
    lineHeight: 20,
  },

  cardValor: {
    fontSize: 20,
    fontWeight: "800",
    color: "#B8C2B2",
  },

  cardValorAtivo: {
    color: "#33b8af",
  },

  observacaoBox: {
    backgroundColor: "#FFF",
    marginTop: 40,
    borderRadius: 18,
    padding: 22,
  },

  observacaoTitulo: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 18,
  },

  textArea: {
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
    minHeight: 120,
    padding: 16,
    textAlignVertical: "top",
    fontSize: 15,
    color: "#111",
  },

  banner: {
    height: 180,
    borderRadius: 20,
    marginTop: 40,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#CCC",
  },

  bannerBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.28)",
  },

  bannerContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 24,
  },

  bannerLogo: {
    width: 160,
    height: 80,
    resizeMode: "contain",
    marginBottom: 12,
  },

  bannerText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 20,
    zIndex: 10,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: "#F8F8F8",
  },

  button: {
    height: 64,
    borderRadius: 12,
    backgroundColor: "#33b8af",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "800",
  },
});