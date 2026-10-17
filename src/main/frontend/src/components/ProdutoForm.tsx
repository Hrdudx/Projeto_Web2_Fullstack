import { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import api from "../services/api";
import type { Produto } from "../types/Produto";

interface ProdutoFormProps {
    onProdutoSalvo: () => void;
    produtoEditando?: Produto | null;
}

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
            // Ex.: preço menor ou igual a zero (regra de negócio do ProdutoService).
            setErro((axios.isAxiosError(e) && e.response?.data?.message) || "Não foi possível salvar o produto.");
            return;
        }

        onProdutoSalvo();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome"
            />
            <input
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição"
            />
            <input
                type="number"
                step="0.01"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="Preço"
            />
            <button type="submit">
                {produtoEditando ? "Salvar alterações" : "Cadastrar"}
            </button>
            {erro && <p className="erro">{erro}</p>}
        </form>
    );
}

export default ProdutoForm;
