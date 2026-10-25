import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

// Extrai a mensagem de erro devolvida pelo back-end (ex.: "E-mail já cadastrado")
export function mensagemDeErro(erro: unknown, padrao: string): string {
    if (axios.isAxiosError(erro) && erro.response?.data?.message) {
        return erro.response.data.message;
    }
    return padrao;
}

export default api;
