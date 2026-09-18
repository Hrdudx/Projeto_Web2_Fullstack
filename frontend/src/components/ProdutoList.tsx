import { useEffect, useState } from "react";
import api from "../services/api";
import type { Produto } from "../types/Produto";
import ProdutoItem from "./ProdutoItem";

function ProdutoList() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        api.get<Produto[]>("/produtos")
            .then((resposta) => {
                setProdutos(resposta.data);
            })
            .catch(() => {
                setErro("Não foi possível carregar os produtos. Verifique se o back-end está rodando.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Carregando produtos...</p>;
    }

    if (erro) {
        return <p>{erro}</p>;
    }

    return (
        <ul>
            {produtos.map((produto) => (
                <ProdutoItem key={produto.id} produto={produto} />
            ))}
        </ul>
    );
}

export default ProdutoList;
