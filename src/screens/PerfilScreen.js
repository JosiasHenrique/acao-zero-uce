import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from "react-native";

import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PerfilScreen({ navigation }) {

    const [photo, setPhoto] = useState(null);

    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    }

    async function logout() {
        Alert.alert("Sair", "Deseja sair da conta?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Sair",
                onPress: async () => {
                    await AsyncStorage.removeItem("currentUser");
                    navigation.replace("Login");
                },
            },
        ]);
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.appName}>UNIFAE Care</Text>

                <TouchableOpacity>
                    <Icon name="person-circle" size={34} color="#33b8af" />
                </TouchableOpacity>
            </View>
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

                <Text style={styles.name}>Cristiane Imamura</Text>
                <Text style={styles.id}>ID: #8829-REHAB</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>FISIOTERAPEUTA RESPONSÁVEL</Text>

                <View style={styles.personRow}>
                    <Image
                        source={require("../../assets/dra.jpg")}
                        style={styles.personImage}
                    />

                    <View>
                        <Text style={styles.person}>Dr. Sarah Chen</Text>
                        <Text style={styles.role}>Especialista Ortopédica</Text>
                    </View>
                </View>

                <Text style={[styles.label, { marginTop: 20 }]}>
                    COORDENADOR RESPONSÁVEL
                </Text>

                <View style={styles.personRow}>
                    <Image
                        source={require("../../assets/dra2.jpg")}
                        style={styles.personImage}
                    />

                    <View>
                        <Text style={styles.person}>Dr. Vanessa</Text>
                        <Text style={styles.role}>Especialista Ortopédica</Text>
                    </View>
                </View>


            <View style={styles.metaCard}>
                <Text style={styles.metaLabel}>META SEMANAL</Text>

                <View style={styles.metaRow}>
                    <Text style={styles.metaPercent}>85%</Text>
                    <Text style={styles.metaDone}> Concluído</Text>
                </View>

                <View style={styles.progressBackground}>
                    <View style={styles.progressFill} />
                </View>
            </View>
            </View>

            <Text style={styles.section}>CONFIGURAÇÕES E SUPORTE</Text>

            <Option icon="notifications-outline" title="Lembretes" />
            <Option icon="notifications-circle-outline" title="Notificações" />
            <Option icon="shield-checkmark-outline" title="Privacidade e Dados" />

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>

            <Text style={styles.version}>V2.4.0</Text>
        </ScrollView>
    );
}

function Option({ title, icon }) {
    return (
        <TouchableOpacity style={styles.option}>
            <View style={styles.optionLeft}>
                <View style={styles.iconCircle}>
                    <Icon name={icon} size={22} color="#33b8af" />
                </View>

                <Text style={styles.optionText}>{title}</Text>
            </View>

            <Icon name="chevron-forward" size={22} color="#999" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 50,
        paddingHorizontal: 20,
    },

    appName: {
        fontSize: 18,
        fontWeight: "600",
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

    personRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    personImage: {
        width: 55,
        height: 55,
        borderRadius: 12,
    },

    person: {
        fontSize: 17,
        fontWeight: "600",
    },

    role: {
        color: "#777",
    },

    section: {
        marginLeft: 20,
        marginTop: 10,
        color: "#999",
        fontSize: 12,
    },

    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F3F3F3",
        marginHorizontal: 15,
        marginTop: 12,
        padding: 18,
        borderRadius: 20,
    },

    optionLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    iconCircle: {
        backgroundColor: "#EAEAEA",
        padding: 10,
        borderRadius: 30,
    },

    optionText: {
        fontSize: 16,
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
        width: "85%",
        height: "100%",
        backgroundColor: "#33b8af",
    },
});