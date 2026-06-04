import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../api/apiClient";

const SERVER_BASE = "http://185.217.125.219:3000";

import ScreenHeader from "../components/ScreenHeader";
import PersonRow from "../components/PersonRow";
import SettingsOption from "../components/SettingsOption";

export default function PerfilScreen({ navigation }) {
  // Usuario
  const [nome, setNome] = useState("");
  const [id, setId] = useState("");
  const [photo, setPhoto] = useState(null);

  // Fisioterapeuta
  const [fisioterapeuta, setFisioterapeuta] = useState("Teste");
  const [photoFisio, setPhotoFisio] = useState(null);

  // Coordenadora
  const [cordenadora, setCordenadora] = useState("Teste2");
  const [coordEspecialidade, setCoordEspecialidade] = useState("Especialista Ortopédica");
  const [photoCoord, setPhotoCoord] = useState(null);

  // Progresso semanal
  const [percentualMeta, setPercentualMeta] = useState("0");

  useEffect(() => {
    async function loadProfileData() {
      try {
        const [profileRes, homeRes] = await Promise.all([
          apiClient.get("app/home/profile"),
          apiClient.get("app/home"),
        ]);

        const { profile, coordinator } = profileRes.data;
        const home = homeRes.data;

        if (profile) {
          setNome(profile.name ?? "");
          setId(profile.id?.toString() ?? "");
          if (profile.photoUrl) {
            setPhoto(SERVER_BASE + profile.photoUrl);
          }
        }

        if (coordinator) {
          setCordenadora(coordinator.name ?? "Não informado");
          setCoordEspecialidade(coordinator.primarySpecialty ?? "Coordenador Responsável");
        }

        setPercentualMeta(String(home.plan?.percentCompleted ?? 0));
      } catch {
        const userString = await AsyncStorage.getItem("user").catch(() => null);
        if (userString) {
          const user = JSON.parse(userString);
          setNome(user.name ?? "");
          setId(user.id?.toString() ?? "");
        }
      }
    }

    loadProfileData();
  }, []);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhoto(uri);

      try {
        const formData = new FormData();
        formData.append("file", { uri, type: "image/jpeg", name: "photo.jpg" });
        await apiClient.post("app/home/profile/photo", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch {
        // foto atualizada localmente mesmo se o upload falhar
      }
    }
  }

  async function logout() {
    Alert.alert("Sair", "Deseja sair da conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        onPress: async () => {
          await AsyncStorage.removeItem("access_token");
          await AsyncStorage.removeItem("user");
          navigation.replace("Login");
        },
      },
    ]);
  }

  return (
    <ScrollView style={styles.container}>
      <ScreenHeader
        rightElement={
          <Image
            source={photo ? { uri: photo } : require("../../assets/profile.jpg")}
            style={styles.headerAvatar}
          />
        }
      />

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              photo
                ? { uri: photo }
                : require("../../assets/profile.jpg")
            }
            style={styles.profileImage}
          />

          <View style={styles.cameraIcon}>
            <Icon name="camera" size={18} color="#FFF" />
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>{nome || "Carregando..."}</Text>
        <Text style={styles.id}>ID: #{id}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>FISIOTERAPEUTA RESPONSÁVEL</Text>

        <PersonRow
          image={require("../../assets/dra.jpg")}
          name={fisioterapeuta}
          role="Especialista Ortopédica"
        />

        <Text style={[styles.label, { marginTop: 20 }]}>
          COORDENADOR RESPONSÁVEL
        </Text>

        <PersonRow
          image={require("../../assets/dra2.jpg")}
          name={cordenadora}
          role={coordEspecialidade}
        />

        <View style={styles.metaCard}>
          <Text style={styles.metaLabel}>META SEMANAL</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaPercent}>{percentualMeta}%</Text>
            <Text style={styles.metaDone}> Concluído</Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: `${percentualMeta}%` },
              ]}
            />
          </View>
        </View>
      </View>

      <Text style={styles.section}>CONFIGURAÇÕES E SUPORTE</Text>

      <SettingsOption icon="notifications-outline" title="Lembretes" />
      <SettingsOption icon="notifications-circle-outline" title="Notificações" />
      <SettingsOption icon="shield-checkmark-outline" title="Privacidade e Dados" />

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

      <Text style={styles.version}>V2.4.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },

  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#33b8af",
    padding: 6,
    borderRadius: 20,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },

  id: {
    color: "gray",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#F3F3F3",
    margin: 15,
    padding: 20,
    borderRadius: 20,
  },

  label: {
    fontSize: 12,
    color: "#888",
    marginBottom: 10,
  },

  section: {
    marginLeft: 20,
    marginTop: 10,
    color: "#999",
    fontSize: 12,
  },

  logoutButton: {
    backgroundColor: "#F2DADA",
    marginHorizontal: 15,
    marginTop: 30,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },

  logoutText: {
    color: "#B3261E",
    fontSize: 18,
    fontWeight: "600",
  },

  version: {
    textAlign: "center",
    marginVertical: 20,
    color: "#999",
  },

  metaCard: {
    marginTop: 25,
    backgroundColor: "#E6EFE6",
    padding: 20,
    borderRadius: 20,
  },

  metaLabel: {
    color: "#33b8af",
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 10,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  metaPercent: {
    fontSize: 48,
    fontWeight: "800",
    color: "#33b8af",
  },

  metaDone: {
    fontSize: 18,
    color: "#33b8af",
    marginBottom: 8,
  },

  progressBackground: {
    height: 10,
    backgroundColor: "#DADADA",
    borderRadius: 10,
    marginTop: 15,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#33b8af",
  },

  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#33b8af",
  },
});