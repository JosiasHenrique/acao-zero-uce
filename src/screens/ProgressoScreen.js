import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Rect, Text as SvgText, G } from "react-native-svg";
import ScreenHeader from "../components/ScreenHeader";
import ProgressCircle from "../components/ProgressCircle";
import apiClient from "../../api/apiClient";

const PRIMARY = "#33b8af";
const DAYS_SHORT = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const SCORE_COLORS = {
  0: "#22c55e",
  2: "#84cc16",
  5: "#facc15",
  8: "#f97316",
  10: "#ef4444",
};

function scoreColor(score) {
  const key = [0, 2, 5, 8, 10].reduce((prev, curr) =>
    Math.abs(curr - score) < Math.abs(prev - score) ? curr : prev
  );
  return SCORE_COLORS[key];
}

function scoreLabel(score) {
  if (score <= 0) return "Sem dor";
  if (score <= 2) return "Leve";
  if (score <= 5) return "Moderado";
  if (score <= 8) return "Intenso";
  return "Exaustão";
}

export default function ProgressoScreen() {
  const { width } = useWindowDimensions();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const [homeRes, weekRes] = await Promise.all([
          apiClient.get("app/home"),
          apiClient.get("app/home/plan/week"),
        ]);

        const home = homeRes.data;
        const week = weekRes.data;

        const weeklyProgress = [0, 0, 0, 0, 0, 0, 0];
        if (week.weekStart && Array.isArray(week.days)) {
          const startDate = new Date(week.weekStart);
          week.days.forEach((day) => {
            const diff = Math.round(
              (new Date(day.date) - startDate) / (1000 * 60 * 60 * 24)
            );
            if (diff >= 0 && diff < 7) {
              weeklyProgress[diff] = day.summary?.percentCompleted ?? 0;
            }
          });
        }

        setData({
          weeklyProgress,
          totalCompleted: home.plan?.completedExercises ?? 0,
          totalExercises: home.plan?.totalExercises ?? 0,
          completionRate: home.plan?.percentCompleted ?? 0,
          percentCompleted: home.plan?.percentCompleted ?? 0,
          history: [],
          motivation: home.motivation,
        });
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    async function loadUser() {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (userString) {
          const user = JSON.parse(userString);
          if (user.photoUrl || user.avatar) {
            setUserPhoto(user.photoUrl ?? user.avatar);
          }
        }
      } catch {}
    }

    fetchProgress();
    loadUser();
  }, []);

  const weekData = data?.weeklyProgress ?? [0, 0, 0, 0, 0, 0, 0];
  const totalDone = data?.totalCompleted ?? 0;
  const totalExercises = data?.totalExercises ?? 0;
  const rate = Number(data?.completionRate ?? 0);
  const percent = Number(data?.percentCompleted ?? 0);
  const history = data?.history ?? [];
  const motivationMsg = data?.motivation?.message ?? "Continue assim, você está indo bem!";

  // Gráfico de barras
  const chartW = width - 64;
  const slotW = chartW / 7;
  const barW = slotW * 0.5;
  const BAR_MAX = 80;
  const CHART_H = 110;
  const todayIndex = (new Date().getDay() + 6) % 7; // Seg=0 … Dom=6

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Progresso"
        rightElement={
          <Image
            source={userPhoto ? { uri: userPhoto } : require("../../assets/profile.jpg")}
            style={styles.headerAvatar}
          />
        }
      />

      {loading ? (
        <ActivityIndicator size="large" color={PRIMARY} style={styles.loader} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Card de progresso geral */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Progresso Geral</Text>
            <View style={styles.summaryRow}>
              <ProgressCircle percent={percent} />
              <View style={styles.summaryText}>
                <Text style={styles.summaryMain}>{motivationMsg}</Text>
                <Text style={styles.summarySub}>
                  {totalDone} exercício{totalDone !== 1 ? "s" : ""} concluído{totalDone !== 1 ? "s" : ""}
                </Text>
              </View>
            </View>
          </View>

          {/* Cards de estatísticas */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Ionicons name="checkmark-circle" size={28} color="#22c55e" />
              <Text style={styles.statValue}>{totalDone}</Text>
              <Text style={styles.statLabel}>Concluídos</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons name="barbell" size={28} color="#f97316" />
              <Text style={styles.statValue}>{totalExercises}</Text>
              <Text style={styles.statLabel}>Total do plano</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons name="stats-chart" size={28} color={PRIMARY} />
              <Text style={styles.statValue}>{rate}%</Text>
              <Text style={styles.statLabel}>Adesão</Text>
            </View>
          </View>

          {/* Gráfico semanal */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Esta Semana</Text>

            <Svg width={chartW} height={CHART_H + 28} style={styles.chart}>
              {weekData.map((val, i) => {
                const barH = Math.max((Math.min(val, 100) / 100) * BAR_MAX, 4);
                const x = i * slotW + (slotW - barW) / 2;
                const isToday = i === todayIndex;
                return (
                  <G key={i}>
                    <Rect
                      x={x}
                      y={8}
                      width={barW}
                      height={BAR_MAX}
                      rx={10}
                      fill="#F0F0F0"
                    />
                    <Rect
                      x={x}
                      y={8 + BAR_MAX - barH}
                      width={barW}
                      height={barH}
                      rx={10}
                      fill={isToday ? PRIMARY : "#A8DDD9"}
                    />
                    <SvgText
                      x={x + barW / 2}
                      y={CHART_H + 24}
                      textAnchor="middle"
                      fill={isToday ? PRIMARY : "#999"}
                      fontSize={12}
                      fontWeight={isToday ? "700" : "400"}
                    >
                      {DAYS_SHORT[i]}
                    </SvgText>
                  </G>
                );
              })}
            </Svg>
          </View>

          {/* Histórico recente */}
          {history.length > 0 && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Histórico Recente</Text>

              {history.map((item, index) => (
                <View
                  key={item.id ?? index}
                  style={[
                    styles.historyItem,
                    index < history.length - 1 && styles.historyItemBorder,
                  ]}
                >
                  <View style={styles.historyIcon}>
                    <Ionicons name="barbell-outline" size={20} color={PRIMARY} />
                  </View>

                  <View style={styles.historyInfo}>
                    <Text style={styles.historyName}>
                      {item.exerciseName ?? "Exercício"}
                    </Text>
                    {item.date && (
                      <Text style={styles.historyDate}>{item.date}</Text>
                    )}
                  </View>

                  {item.score != null && (
                    <View
                      style={[
                        styles.scoreBadge,
                        { backgroundColor: scoreColor(item.score) + "22" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.scoreText,
                          { color: scoreColor(item.score) },
                        ]}
                      >
                        {scoreLabel(item.score)}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {history.length === 0 && !loading && (
            <View style={styles.emptyHistory}>
              <Ionicons name="trophy-outline" size={48} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>Sem histórico ainda</Text>
              <Text style={styles.emptySubtitle}>
                Conclua seus primeiros exercícios para ver seu histórico aqui.
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },

  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: PRIMARY,
  },
  loader: {
    marginTop: 60,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },

  // Card base
  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 14,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 18,
  },

  // Resumo
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  summaryText: {
    flex: 1,
  },
  summaryMain: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    lineHeight: 22,
  },
  summarySub: {
    marginTop: 6,
    color: "#888",
    fontSize: 14,
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    gap: 6,
    elevation: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  statLabel: {
    fontSize: 11,
    color: "#999",
    textAlign: "center",
  },

  // Gráfico
  chart: {
    alignSelf: "center",
  },

  // Histórico
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 14,
  },
  historyItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
  },
  historyIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EBF9F8",
    alignItems: "center",
    justifyContent: "center",
  },
  historyInfo: {
    flex: 1,
  },
  historyName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  historyDate: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: "700",
  },

  // Empty
  emptyHistory: {
    alignItems: "center",
    marginTop: 20,
    gap: 10,
    paddingBottom: 10,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#999",
  },
  emptySubtitle: {
    color: "#BBB",
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 22,
  },
});
