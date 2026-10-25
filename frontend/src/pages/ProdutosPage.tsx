import { useEffect, useState } from "react";
import api from "../services/api";
import type { Produto } from "../types/Produto";
import ProdutoItem from "../components/ProdutoItem";
import ProdutoForm from "../components/ProdutoForm";
import Botao from "../components/Botao";

function ProdutosPage() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [editando, setEditando] = useState<Produto | null>(null);

    function carregarProdutos() {
        api.get<Produto[]>("/produtos")
            .then((resposta) => {
                setProdutos(resposta.data);
                setErro(null);
            })
            .catch(() => {
                setErro("Não foi possível carregar os produtos. Verifique se o back-end está rodando.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        carregarProdutos();
    }, []);

    async function excluir(id: number) {
        await api.delete(`/produtos/${id}`);
        carregarProdutos();
    }

    return (
        <div>
            <h1 className="mb-4 text-2xl font-bold text-gray-800">Produtos</h1>
            <ProdutoForm key={editando?.id ?? "novo"} produtoEditando={editando}
                onProdutoSalvo={() => { carregarProdutos(); setEditando(null); }} />

            {loading && <p className="text-gray-600">Carregando produtos...</p>}
            {erro && <p className="text-red-600">{erro}</p>}

            {!loading && !erro && (
                <ul className="divide-y divide-gray-200 rounded-lg bg-white shadow">
                    {produtos.length === 0 && (
                        <li className="p-4 text-gray-500">Nenhum produto cadastrado.</li>
                    )}
                    {produtos.map((produto) => (
                        <li key={produto.id} className="flex items-center justify-between gap-2 p-4">
                            <ProdutoItem produto={produto} />
                            <div className="flex gap-2">
                                <Botao variante="neutro" onClick={() => setEditando(produto)}>Editar</Botao>
                                <Botao variante="perigo" onClick={() => excluir(produto.id)}>Excluir</Botao>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProdutosPage;
