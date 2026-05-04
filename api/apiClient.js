import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://185.217.125.219:3000/api/v1/", 

});

export default apiClient;