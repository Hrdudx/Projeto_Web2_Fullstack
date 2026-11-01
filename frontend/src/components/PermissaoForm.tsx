import { useState } from "react";
import type { FormEvent } from "react";
import api, { mensagemDeErro } from "../services/api";
import type { Permissao } from "../types/Permissao";
import Botao from "./Botao";

interface PermissaoFormProps {
    onPermissaoSalva: () => void;
    permissaoEditando?: Permissao | null;
}

const campo =
    "rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none";

function PermissaoForm({ onPermissaoSalva, permissaoEditando }: PermissaoFormProps) {
    const [nome, setNome] = useState(permissaoEditando?.nome ?? "");
    const [descricao, setDescricao] = useState(permissaoEditando?.descricao ?? "");
    const [erro, setErro] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const dados = { nome, descricao };

        try {
            if (permissaoEditando) {
                await api.put(`/permissoes/${permissaoEditando.id}`, dados);
            } else {
                await api.post("/permissoes", dados);
            }
        } catch (e) {
            setErro(mensagemDeErro(e, "Não foi possível salvar a permissão."));
            return;
        }

        setErro(null);
        onPermissaoSalva();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-6 grid gap-3 rounded-lg bg-white p-4 shadow md:grid-cols-3"
        >
            <input className={campo} value={nome}
                onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
            <input className={campo} value={descricao}
                onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
            <Botao type="submit">
                {permissaoEditando ? "Salvar alterações" : "Cadastrar"}
            </Botao>
            {erro && <p className="text-sm text-red-600 md:col-span-3">{erro}</p>}
        </form>
    );
}

export default PermissaoForm;
