import { useEffect, useState } from "react";
import api from "../services/api";
import type { Permissao } from "../types/Permissao";
import PermissaoItem from "./PermissaoItem";

function PermissaoList() {
    const [permissoes, setPermissoes] = useState<Permissao[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        api.get<Permissao[]>("/permissoes")
            .then((resposta) => {
                setPermissoes(resposta.data);
            })
            .catch(() => {
                setErro("Não foi possível carregar as permissões. Verifique se o back-end está rodando.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Carregando permissões...</p>;
    }

    if (erro) {
        return <p>{erro}</p>;
    }

    return (
        <ul>
            {permissoes.map((permissao) => (
                <PermissaoItem key={permissao.id} permissao={permissao} />
            ))}
        </ul>
    );
}

export default PermissaoList;
