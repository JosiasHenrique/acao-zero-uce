import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import apiClient from "../../api/apiClient";

// Seus componentes customizados
import ExercicioInfoCard from "../components/ExercicioScreen/ExercicioInfoCard";
import ExercicioHeader from "../components/ExercicioScreen/ExercicioHeader";
import ExercicioVideo from "../components/ExercicioScreen/ExercicioVideo";
import ExercicioStep from "../components/ExercicioScreen/ExercicioStep";
import ExercicioTips from "../components/ExercicioScreen/ExercicioTips";

const PRIMARY = "#33b8af";

export default function ExercicioScreen({ navigation, route }) {
  const [dadosExercicio, setDadosExercicio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const { executionId } = route.params;

const handleFinalizarExercicio = async () => {
  setCompleting(true);
  try {
    // 1. Avisa o servidor que o exercício terminou e pega o executionId real
    const response = await apiClient.post(`app/home/plan/exercises/${executionId}/complete`);
    
    const idGeradoPeloBanco = response.data.executionId;

    // 2. Agora sim, vai para o Feedback levando o ID CORRETO
    navigation.navigate("Feedback", { executionId: idGeradoPeloBanco });
    
  } catch (error) {
    Alert.alert("Erro", "Não conseguimos registrar a conclusão do exercício.");
  } finally {
    setCompleting(false);
  }
};

  useEffect(() => {
    async function loadDetalhes() {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `app/home/plan/exercises/${executionId}`,
        );
        setDadosExercicio(response.data);
      } catch (error) {
        // silently fails; loading state returns to false
      } finally {
        setLoading(false);
      }
    }

    if (executionId) {
      loadDetalhes();
    }
  }, [executionId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PRIMARY} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ExercicioHeader navigation={navigation} />

        <View style={styles.tagsRow}>
          <Text style={styles.tag}>
            {dadosExercicio?.taxonomy?.axis?.toUpperCase()}
          </Text>
          <Text style={styles.tag}>
            {dadosExercicio?.taxonomy?.problem?.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.title}>{dadosExercicio?.title}</Text>

        <ExercicioVideo videoUrl={dadosExercicio?.videoUrl} />

        <View style={styles.cardsRow}>
          <ExercicioInfoCard
            icon="repeat"
            label="SÉRIES"
            value={dadosExercicio?.metrics?.series || "0"}
            subtitle="Unidades"
          />

          <ExercicioInfoCard
            icon="barbell"
            label="VOLUME"
            value={dadosExercicio?.metrics?.volume || "0"}
            subtitle="Repetições"
          />
        </View>

        <Text style={styles.sectionTitle}>Passo a Passo</Text>

        {dadosExercicio?.steps?.map((step, index) => (
          <ExercicioStep
            key={index}
            number={String(step.order)}
            active={index === 0} 
            title={`Passo ${step.order}`}
            text={step.text}
          />
        ))}

        {dadosExercicio?.physiotherapistNotes && (
          <ExercicioTips message={dadosExercicio.physiotherapistNotes} />
        )}
      </ScrollView>

      <View style={styles.footer}>
       <TouchableOpacity 
  style={[styles.button, completing && { opacity: 0.7 }]}
  onPress={handleFinalizarExercicio}
  disabled={completing}
>
  {completing ? (
    <ActivityIndicator color="#FFF" />
  ) : (
    <Text style={styles.buttonText}>Concluir Atividade</Text>
  )}
</TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 30, 
    backgroundColor: "#FFF" 
  },
  content: { 
    paddingHorizontal: 24, 
    paddingBottom: 120 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  tagsRow: { 
    flexDirection: "row", 
    gap: 10, 
    marginTop: 10 
  },
  tag: {
    backgroundColor: PRIMARY,
    color: "#FFF",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "700",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 18, 
    marginBottom: 20 
  },
  cardsRow: { 
    flexDirection: "row", 
    gap: 18,
    marginTop: 20 
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 36,
    marginBottom: 24,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    backgroundColor: "#FFF",
  },
  button: {
    height: 62,
    borderRadius: 9,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { 
    color: "#FFF", 
    fontSize: 19, 
    fontWeight: "800" 
  },
});
