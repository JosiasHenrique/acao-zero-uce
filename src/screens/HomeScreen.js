import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ProgressCircle from "../components/ProgressCircle";
import ExerciseCard from "../components/ExerciseCard";
import apiClient from "../../api/apiClient"; 

export default function HomeScreen() {
  const [nome, setNome] = useState("");
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPhoto, setUserPhoto] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadData() {
    
      try {
        // 1. Pega o nome do usuário salvo localmente
        const userString = await AsyncStorage.getItem("user");
        if (userString) {
          const user = JSON.parse(userString);
          setNome(user.name);
          if (user.photoUrl || user.avatar) {
            setUserPhoto(user.photoUrl ?? user.avatar);
          }
        }

        // 2. Busca os dados da Home na API
        const response = await apiClient.get("app/home");
        setHomeData(response.data);

      } catch (error) {
        // silently fails
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroContainer}>

        <Image
          source={require("../../assets/paciente.jpg")}
          style={styles.heroImage}
        />

        <View style={styles.overlay} />

        <View style={styles.heroContent}>
          <View>
            <Text style={styles.hello}>
              Olá, {nome || "..."}!
            </Text>

            <Text style={styles.subtitle}>
              Seu cuidado diário faz toda a diferença na sua recuperação.
            </Text>
          </View>

          <View style={styles.heroActions}>
            <Ionicons name="notifications-outline" size={26} color="#000" />
            <Image
              source={userPhoto ? { uri: userPhoto } : require("../../assets/profile.jpg")}
              style={styles.heroAvatar}
            />
          </View>
        </View>

      </View>

      <View style={styles.planCard}>

        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>Seu plano de hoje</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#33b8af" />
          ) : (
            <Text style={styles.exerciseCount}>
              {homeData?.plan?.totalExercises || 0} exercícios
            </Text>
          )}
        </View>

        {loading ? (
           <ActivityIndicator size="large" color="#33b8af" style={{ marginVertical: 30 }} />
        ) : (
          <ExerciseCard
            title={homeData?.nextExercise?.exerciseName || "Exercício"}
            description={homeData?.nextExercise ? `${homeData.nextExercise.axis} • ${homeData.nextExercise.problem}` : "Plano concluído"}
            time="12 min"
            image={require("../../assets/exercicio.jpg")}
          />
        )}

        <TouchableOpacity
          style={[styles.startButton, (loading || !homeData?.nextExercise) && { opacity: 0.7 }]}
          disabled={loading || !homeData?.nextExercise}
          onPress={() => {
            // Passa o ID real para a tela de Exercício
            if (homeData?.nextExercise?.prescriptionItemId) {
              navigation.navigate("Exercicios", { 
                executionId: homeData.nextExercise.prescriptionItemId 
              });
            }
          }}
        >
          <Text style={styles.startText}>
            {homeData?.nextExercise ? "Iniciar exercício" : "Concluído"}
          </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.progressCard}>
  <Text style={styles.progressTitle}>Seu progresso</Text>

  <View style={styles.progressRow}>
    {/* Colocamos o !loading &&. 
      Isso faz o ProgressCircle só aparecer na tela DEPOIS que a API terminar de carregar.
    */}
    {!loading && (
      <ProgressCircle percent={Number(homeData?.plan?.percentCompleted) || 0} />
    )}

    <View style={{ flex: 1, marginLeft: 15 }}> 
      <Text style={styles.progressMsg}>
        {homeData?.motivation?.message || "Você está indo muito bem!"}
      </Text>

      <Text style={styles.progressSub}>
        Continue assim 💚
      </Text>
    </View>
  </View>
</View>
    </ScrollView>
  );
}

const PRIMARY = "#33b8af";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },

  /* HERO */
  heroContainer: {
    height: 320,
  },

  heroImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.47)",
  },

  heroContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  heroActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  heroAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#FFF",
  },

  hello: {
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 6,
    color: "#070707ff",
    width: 230,
  },

  /* CARD PLANO */
  planCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 15,
    marginTop: -60,
    borderRadius: 25,
    padding: 20,
    elevation: 4,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  exerciseCount: {
    color: PRIMARY,
    fontWeight: "600",
  },

  startButton: {
    backgroundColor: PRIMARY,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  startText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },

  /* PROGRESSO */
  progressCard: {
    backgroundColor: "#FFF",
    margin: 15,
    borderRadius: 25,
    padding: 20,
  },

  progressTitle: {
    fontWeight: "600",
    marginBottom: 15,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  progressMsg: {
    fontWeight: "600",
    fontSize: 16,
  },

  progressSub: {
    color: "#666",
    marginTop: 5,
  },
});