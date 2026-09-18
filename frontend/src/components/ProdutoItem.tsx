import type { Produto } from "../types/Produto";

interface ProdutoItemProps {
    produto: Produto;
}

function ProdutoItem({ produto }: ProdutoItemProps) {
    return (
        <li>
            <strong>{produto.nome}</strong> — {produto.descricao} (R$ {produto.preco.toFixed(2)})
        </li>
    );
}

export default ProdutoItem;
