import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiClient = axios.create({
  baseURL: "http://185.217.125.219:3000/api/v1/",
});

// 1. INTERCEPTOR DE REQUISIÇÃO (Envia o Token)
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("access_token");
console.log(">>> ENVIANDO TOKEN NA REQUISIÇÃO:", token ? "Sim (Token existe)" : "Não (Está vazio!)");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); // <-- Aqui faltava fechar!

// 2. INTERCEPTOR DE RESPOSTA (Log de Debug para ver os dados)
apiClient.interceptors.response.use(
  (response) => {
    console.log(`\n--- [API SUCCESS] ${response.config.method.toUpperCase()} ${response.config.url} ---`);
    console.log(JSON.stringify(response.data, null, 2));
    console.log(`----------------------------------------------------------\n`);
    return response;
  },
  (error) => {
    console.log(`\n--- [API ERROR] ${error.config?.url} ---`);
    console.log("Status:", error.response?.status);
    console.log("Mensagem:", JSON.stringify(error.response?.data, null, 2));
    console.log(`---------------------------------------\n`);
    return Promise.reject(error);
  }
);

export default apiClient;