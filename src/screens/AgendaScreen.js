import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenHeader from "../components/ScreenHeader";
import apiClient from "../../api/apiClient";

const PRIMARY = "#33b8af";
const DAYS_PT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS_PT = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function generateWeekDays(center) {
  const days = [];
  for (let i = -3; i <= 3; i++) {
    const d = new Date(center);
    d.setDate(center.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getStatusColor(status) {
  if (status === "done" || status === "completed") return "#22c55e";
  if (status === "pending" || status === "scheduled") return PRIMARY;
  return "#D1D5DB";
}

function getStatusIcon(status) {
  if (status === "done" || status === "completed") return "checkmark-circle";
  if (status === "pending" || status === "scheduled") return "time";
  return "ellipse-outline";
}

function mapAppointment(apt) {
  const scheduledAt = new Date(apt.scheduledAt);
  return {
    id: apt.id,
    time: scheduledAt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    name: apt.location?.name ?? (apt.modality === "ONLINE" ? "Consulta Online" : "Consulta Presencial"),
    status: scheduledAt < new Date() ? "completed" : "scheduled",
    axis: apt.modality === "IN_PERSON" ? "Presencial" : "Online",
    problem: apt.location?.address ?? null,
  };
}

export default function AgendaScreen() {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(today);
  const [weekCenter, setWeekCenter] = useState(today);
  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
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
    loadUser();
  }, []);

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true);
      try {
        const response = await apiClient.get("app/home/appointments");
        const raw = response.data;
        setAllAppointments(Array.isArray(raw) ? raw : raw?.appointments ?? []);
      } catch {
        setAllAppointments([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  const days = generateWeekDays(weekCenter);
  const monthLabel = `${MONTHS_PT[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

  const sessions = allAppointments
    .filter(apt => isSameDay(new Date(apt.scheduledAt), selectedDate))
    .map(mapAppointment);

  function prevWeek() {
    const d = new Date(weekCenter);
    d.setDate(d.getDate() - 7);
    setWeekCenter(d);
  }

  function nextWeek() {
    const d = new Date(weekCenter);
    d.setDate(d.getDate() + 7);
    setWeekCenter(d);
  }

  function selectDay(day) {
    setSelectedDate(day);
    setWeekCenter(day);
  }

  const dateLabel = isSameDay(selectedDate, today)
    ? "Hoje"
    : `${selectedDate.getDate()} de ${MONTHS_PT[selectedDate.getMonth()]}`;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Agenda"
        rightElement={
          <Image
            source={userPhoto ? { uri: userPhoto } : require("../../assets/profile.jpg")}
            style={styles.headerAvatar}
          />
        }
      />

      <View style={styles.monthRow}>
        <TouchableOpacity onPress={prevWeek} style={styles.navBtn}>
          <Ionicons name="chevron-back" size={22} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.monthLabel}>{monthLabel}</Text>
        <TouchableOpacity onPress={nextWeek} style={styles.navBtn}>
          <Ionicons name="chevron-forward" size={22} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekStrip}>
        {days.map((d) => {
          const isSelected = isSameDay(d, selectedDate);
          const isToday = isSameDay(d, today);
          return (
            <TouchableOpacity
              key={d.toISOString()}
              style={[styles.dayBtn, isSelected && styles.dayBtnSelected]}
              onPress={() => selectDay(d)}
            >
              <Text style={[styles.dayName, isSelected && styles.dayTextSelected]}>
                {DAYS_PT[d.getDay()]}
              </Text>
              <Text style={[styles.dayNum, isSelected && styles.dayTextSelected]}>
                {d.getDate()}
              </Text>
              {isToday && !isSelected && <View style={styles.todayDot} />}
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        <Text style={styles.sectionTitle}>{dateLabel}</Text>

        {loading ? (
          <ActivityIndicator size="large" color={PRIMARY} style={styles.loader} />
        ) : sessions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={56} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>Nenhuma sessão</Text>
            <Text style={styles.emptySubtitle}>
              Não há consultas agendadas para este dia.
            </Text>
          </View>
        ) : (
          sessions.map((session, index) => {
            const statusColor = getStatusColor(session.status);
            const statusIcon = getStatusIcon(session.status);
            return (
              <View key={session.id ?? index} style={styles.sessionCard}>
                <View style={[styles.statusBar, { backgroundColor: statusColor }]} />

                <View style={styles.sessionInfo}>
                  <View style={styles.sessionTopRow}>
                    <Ionicons name={statusIcon} size={16} color={statusColor} />
                    <Text style={styles.sessionTime}>
                      {session.time ?? "--:--"}
                    </Text>
                  </View>

                  <Text style={styles.sessionName}>
                    {session.name ?? "Consulta"}
                  </Text>

                  {(session.axis || session.problem) && (
                    <View style={styles.tagsRow}>
                      {session.axis && (
                        <View style={styles.tag}>
                          <Text style={styles.tagText}>{session.axis}</Text>
                        </View>
                      )}
                      {session.problem && (
                        <View style={styles.tag}>
                          <Text style={styles.tagText}>{session.problem}</Text>
                        </View>
                      )}
                    </View>
                  )}
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#D1D5DB"
                  style={styles.cardArrow}
                />
              </View>
            );
          })
        )}
      </ScrollView>
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

  monthRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  navBtn: {
    padding: 4,
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  weekStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    marginBottom: 6,
  },
  dayBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 42,
    paddingVertical: 8,
    borderRadius: 14,
  },
  dayBtnSelected: {
    backgroundColor: PRIMARY,
  },
  dayName: {
    fontSize: 11,
    color: "#999",
    marginBottom: 4,
  },
  dayNum: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  dayTextSelected: {
    color: "#FFF",
  },
  todayDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: PRIMARY,
    marginTop: 4,
  },

  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 18,
  },
  loader: {
    marginTop: 50,
  },

  emptyState: {
    alignItems: "center",
    marginTop: 60,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#999",
  },
  emptySubtitle: {
    color: "#BBB",
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 22,
  },

  sessionCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    elevation: 2,
  },
  statusBar: {
    width: 5,
    alignSelf: "stretch",
  },
  sessionInfo: {
    flex: 1,
    padding: 18,
  },
  sessionTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  sessionTime: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  sessionName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  tagsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  tag: {
    backgroundColor: "#EBF9F8",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagText: {
    color: PRIMARY,
    fontSize: 12,
    fontWeight: "600",
  },
  cardArrow: {
    marginRight: 16,
  },
});
