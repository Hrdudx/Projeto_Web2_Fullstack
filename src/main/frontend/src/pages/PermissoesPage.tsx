import { useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api";
import type { Permissao } from "../types/Permissao";
import PermissaoItem from "../components/PermissaoItem";
import PermissaoForm from "../components/PermissaoForm";

function PermissoesPage() {
    const [permissoes, setPermissoes] = useState<Permissao[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [erroExclusao, setErroExclusao] = useState<string | null>(null);
    const [editando, setEditando] = useState<Permissao | null>(null);

    function carregarPermissoes() {
        api.get<Permissao[]>("/permissoes")
            .then((resposta) => {
                setPermissoes(resposta.data);
                setErro(null);
            })
            .catch(() => {
                setErro("Não foi possível carregar as permissões. Verifique se o back-end está rodando.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        carregarPermissoes();
    }, []);

    async function excluir(id: number) {
        try {
            await api.delete(`/permissoes/${id}`);
            setErroExclusao(null);
        } catch (e) {
            // Ex.: permissão atribuída a algum usuário.
            setErroExclusao((axios.isAxiosError(e) && e.response?.data?.message) || "Não foi possível excluir a permissão.");
        }
        carregarPermissoes();
    }

    if (loading) {
        return <p>Carregando permissões...</p>;
    }

    if (erro) {
        return <p className="erro">{erro}</p>;
    }

    return (
        <div>
            <h1>Permissões</h1>
            <PermissaoForm
                key={editando?.id ?? "novo"}
                permissaoEditando={editando}
                onPermissaoSalva={() => {
                    carregarPermissoes();
                    setEditando(null);
                }}
            />
            {erroExclusao && <p className="erro">{erroExclusao}</p>}
            <ul>
                {permissoes.map((permissao) => (
                    <PermissaoItem
                        key={permissao.id}
                        permissao={permissao}
                        onEditar={() => setEditando(permissao)}
                        onExcluir={() => excluir(permissao.id)}
                    />
                ))}
            </ul>
        </div>
    );
}

export default PermissoesPage;
