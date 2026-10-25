import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import type { Permissao } from "../types/Permissao";
import Botao from "../components/Botao";

function PermissaoDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [permissao, setPermissao] = useState<Permissao | null>(null);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        api.get<Permissao>(`/permissoes/${id}`)
            .then((resposta) => {
                setPermissao(resposta.data);
            })
            .catch(() => {
                setErro("Permissão não encontrada.");
            });
    }, [id]);

    if (erro) {
        return <p className="text-red-600">{erro}</p>;
    }

    if (!permissao) {
        return <p className="text-gray-600">Carregando...</p>;
    }

    return (
        <div className="max-w-md rounded-lg bg-white p-6 shadow">
            <h1 className="mb-4 text-2xl font-bold text-gray-800">{permissao.nome}</h1>
            <p className="mb-4 text-gray-700"><strong>Descrição:</strong> {permissao.descricao}</p>
            <Botao variante="neutro" onClick={() => navigate("/permissoes")}>Voltar</Botao>
        </div>
    );
}

export default PermissaoDetailPage;
