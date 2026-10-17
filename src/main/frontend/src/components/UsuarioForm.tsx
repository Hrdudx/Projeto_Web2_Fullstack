import { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";

interface UsuarioFormProps {
    onUsuarioSalvo: () => void;
    usuarioEditando?: Usuario | null;
}

function UsuarioForm({ onUsuarioSalvo, usuarioEditando }: UsuarioFormProps) {
    const navigate = useNavigate();
    const [nome, setNome] = useState(usuarioEditando?.nome ?? "");
    const [username, setUsername] = useState(usuarioEditando?.username ?? "");
    const [email, setEmail] = useState(usuarioEditando?.email ?? "");
    const [erro, setErro] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const dados = { nome, username, email };

        try {
            if (usuarioEditando) {
                await api.put(`/usuarios/${usuarioEditando.id}`, dados);
            } else {
                await api.post("/usuarios", dados);
            }
        } catch (e) {
            // Ex.: e-mail duplicado (regra de negócio do UsuarioService).
            setErro((axios.isAxiosError(e) && e.response?.data?.message) || "Não foi possível salvar o usuário.");
            return;
        }

        onUsuarioSalvo();
        // Aula 08: depois de salvar, volta para a lista de usuários.
        navigate("/usuarios");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome"
            />
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
            />
            <button type="submit">
                {usuarioEditando ? "Salvar alterações" : "Cadastrar"}
            </button>
            {erro && <p className="erro">{erro}</p>}
        </form>
    );
}

export default UsuarioForm;
