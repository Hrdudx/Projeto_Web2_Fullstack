import { useEffect, useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";
import type { Permissao } from "../types/Permissao";

function UsuarioPermissoesPage() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [permissoes, setPermissoes] = useState<Permissao[]>([]);
    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const [idsSelecionados, setIdsSelecionados] = useState<number[]>([]);

    useEffect(() => {
        api.get<Usuario[]>("/usuarios").then((r) => setUsuarios(r.data));
        api.get<Permissao[]>("/permissoes").then((r) => setPermissoes(r.data));
    }, []);

    function selecionarUsuario(id: number) {
        setUsuarioId(id);
        api.get<Usuario>(`/usuarios/${id}/permissoes`).then((r) => {
            setIdsSelecionados(r.data.permissoes?.map((p) => p.id) ?? []);
        });
    }

    function alternarPermissao(id: number) {
        setIdsSelecionados((prev) =>
            prev.includes(id)
                ? prev.filter((p) => p !== id)
                : [...prev, id]
        );
    }

    async function salvar() {
        if (usuarioId === null) return;
        await api.put(`/usuarios/${usuarioId}/permissoes`, idsSelecionados);
        alert("Permissões salvas!");
    }

    return (
        <div>
            <h1>Atribuir Permissões</h1>

            <label>Usuário:</label>
            <select
                value={usuarioId ?? ""}
                onChange={(e) => selecionarUsuario(Number(e.target.value))}
            >
                <option value="">Selecione...</option>
                {usuarios.map((u) => (
                    <option key={u.id} value={u.id}>
                        {u.nome} ({u.username})
                    </option>
                ))}
            </select>

            <fieldset>
                <legend>Permissões</legend>
                {permissoes.map((p) => (
                    <label key={p.id}>
                        <input
                            type="checkbox"
                            checked={idsSelecionados.includes(p.id)}
                            onChange={() => alternarPermissao(p.id)}
                        />
                        {p.nome} — {p.descricao}
                    </label>
                ))}
            </fieldset>

            <button onClick={salvar} disabled={usuarioId === null}>
                Salvar permissões
            </button>
        </div>
    );
}

export default UsuarioPermissoesPage;
