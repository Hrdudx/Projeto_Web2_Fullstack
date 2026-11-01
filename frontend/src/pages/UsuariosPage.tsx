import { useEffect, useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";
import UsuarioItem from "../components/UsuarioItem";
import UsuarioForm from "../components/UsuarioForm";
import Botao from "../components/Botao";

function UsuariosPage() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [editando, setEditando] = useState<Usuario | null>(null);

    function carregarUsuarios() {
        api.get<Usuario[]>("/usuarios")
            .then((resposta) => {
                setUsuarios(resposta.data);
                setErro(null);
            })
            .catch(() => {
                setErro("Não foi possível carregar os usuários. Verifique se o back-end está rodando.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        carregarUsuarios();
    }, []);

    async function excluir(id: number) {
        await api.delete(`/usuarios/${id}`);
        carregarUsuarios();
    }

    return (
        <div>
            <h1 className="mb-4 text-2xl font-bold text-gray-800">Usuários</h1>
            <UsuarioForm key={editando?.id ?? "novo"} usuarioEditando={editando}
                onUsuarioSalvo={() => { carregarUsuarios(); setEditando(null); }} />

            {loading && <p className="text-gray-600">Carregando usuários...</p>}
            {erro && <p className="text-red-600">{erro}</p>}

            {!loading && !erro && (
                <ul className="divide-y divide-gray-200 rounded-lg bg-white shadow">
                    {usuarios.length === 0 && (
                        <li className="p-4 text-gray-500">Nenhum usuário cadastrado.</li>
                    )}
                    {usuarios.map((usuario) => (
                        <li key={usuario.id} className="flex items-center justify-between gap-2 p-4">
                            <UsuarioItem usuario={usuario} />
                            <div className="flex gap-2">
                                <Botao variante="neutro" onClick={() => setEditando(usuario)}>Editar</Botao>
                                <Botao variante="perigo" onClick={() => excluir(usuario.id)}>Excluir</Botao>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UsuariosPage;
