import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://185.217.125.219:3000/api/v1/", 

});

export default apiClient;


/**
 * {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgsImVtYWlsIjoidGFsaWEuc2lsdmFAc291LmZhZS5iciIsInJvbGUiOiJQQVRJRU5UIiwiYXBwSWQiOjEsImNvdXJzZUlkIjoxLCJpYXQiOjE3Nzc5MzQ4NTQsImV4cCI6MTc3NzkzNTc1NH0.yrfhXqcGCHfYpTmgB2t4XBUzmIH0CFY9vLDV5p67Efs",
    "user": {
        "id": 8,
        "name": "Talia Silva",
        "email": "talia.silva@sou.fae.br",
        "role": "PATIENT",
        "appId": 1,
        "courseId": 1,
        "nextVisitDate": null
    },
    "consentRequired": {
        "consentTermId": 2,
        "courseId": 1,
        "version": "0.9",
        "title": null,
        "content": "<p>Versão anterior arquivada.</p>"
    }
}
 */