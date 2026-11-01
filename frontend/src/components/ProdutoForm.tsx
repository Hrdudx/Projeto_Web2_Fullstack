import { useState } from "react";
import type { FormEvent } from "react";
import api, { mensagemDeErro } from "../services/api";
import type { Produto } from "../types/Produto";
import Botao from "./Botao";

interface ProdutoFormProps {
    onProdutoSalvo: () => void;
    produtoEditando?: Produto | null;
}

const campo =
    "rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none";

function ProdutoForm({ onProdutoSalvo, produtoEditando }: ProdutoFormProps) {
    const [nome, setNome] = useState(produtoEditando?.nome ?? "");
    const [descricao, setDescricao] = useState(produtoEditando?.descricao ?? "");
    const [preco, setPreco] = useState(produtoEditando?.preco?.toString() ?? "");
    const [erro, setErro] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const dados = { nome, descricao, preco: Number(preco) };

        try {
            if (produtoEditando) {
                await api.put(`/produtos/${produtoEditando.id}`, dados);
            } else {
                await api.post("/produtos", dados);
            }
        } catch (e) {
            setErro(mensagemDeErro(e, "Não foi possível salvar o produto."));
            return;
        }

        setErro(null);
        onProdutoSalvo();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-6 grid gap-3 rounded-lg bg-white p-4 shadow md:grid-cols-4"
        >
            <input className={campo} value={nome}
                onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
            <input className={campo} value={descricao}
                onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
            <input className={campo} type="number" step="0.01" value={preco}
                onChange={(e) => setPreco(e.target.value)} placeholder="Preço" />
            <Botao type="submit">
                {produtoEditando ? "Salvar alterações" : "Cadastrar"}
            </Botao>
            {erro && <p className="text-sm text-red-600 md:col-span-4">{erro}</p>}
        </form>
    );
}

export default ProdutoForm;
