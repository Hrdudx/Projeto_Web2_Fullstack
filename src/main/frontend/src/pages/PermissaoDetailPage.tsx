import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import type { Permissao } from "../types/Permissao";

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
        return <p className="erro">{erro}</p>;
    }

    if (!permissao) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <h1>{permissao.nome}</h1>
            <p><strong>Descrição:</strong> {permissao.descricao}</p>
            <button onClick={() => navigate("/permissoes")}>Voltar</button>
        </div>
    );
}

export default PermissaoDetailPage;
