import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api, { mensagemDeErro } from "../services/api";
import type { Usuario } from "../types/Usuario";
import Botao from "./Botao";

interface UsuarioFormProps {
    onUsuarioSalvo: () => void;
    usuarioEditando?: Usuario | null;
}

const campo =
    "rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none";

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
            setErro(mensagemDeErro(e, "Não foi possível salvar o usuário."));
            return;
        }

        setErro(null);
        onUsuarioSalvo();
        navigate("/usuarios");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-6 grid gap-3 rounded-lg bg-white p-4 shadow md:grid-cols-4"
        >
            <input className={campo} value={nome}
                onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
            <input className={campo} value={username}
                onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input className={campo} value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
            <Botao type="submit">
                {usuarioEditando ? "Salvar alterações" : "Cadastrar"}
            </Botao>
            {erro && <p className="text-sm text-red-600 md:col-span-4">{erro}</p>}
        </form>
    );
}

export default UsuarioForm;
