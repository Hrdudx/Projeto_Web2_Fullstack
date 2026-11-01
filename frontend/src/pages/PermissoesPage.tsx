import { useEffect, useState } from "react";
import api from "../services/api";
import type { Permissao } from "../types/Permissao";
import PermissaoItem from "../components/PermissaoItem";
import PermissaoForm from "../components/PermissaoForm";
import Botao from "../components/Botao";

function PermissoesPage() {
    const [permissoes, setPermissoes] = useState<Permissao[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
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
        await api.delete(`/permissoes/${id}`);
        carregarPermissoes();
    }

    return (
        <div>
            <h1 className="mb-4 text-2xl font-bold text-gray-800">Permissões</h1>
            <PermissaoForm key={editando?.id ?? "novo"} permissaoEditando={editando}
                onPermissaoSalva={() => { carregarPermissoes(); setEditando(null); }} />

            {loading && <p className="text-gray-600">Carregando permissões...</p>}
            {erro && <p className="text-red-600">{erro}</p>}

            {!loading && !erro && (
                <ul className="divide-y divide-gray-200 rounded-lg bg-white shadow">
                    {permissoes.length === 0 && (
                        <li className="p-4 text-gray-500">Nenhuma permissão cadastrada.</li>
                    )}
                    {permissoes.map((permissao) => (
                        <li key={permissao.id} className="flex items-center justify-between gap-2 p-4">
                            <PermissaoItem permissao={permissao} />
                            <div className="flex gap-2">
                                <Botao variante="neutro" onClick={() => setEditando(permissao)}>Editar</Botao>
                                <Botao variante="perigo" onClick={() => excluir(permissao.id)}>Excluir</Botao>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PermissoesPage;
