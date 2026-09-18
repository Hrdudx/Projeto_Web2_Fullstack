import { useEffect, useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";
import UsuarioItem from "./UsuarioItem";

function UsuarioList() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        api.get<Usuario[]>("/usuarios")
            .then((resposta) => {
                setUsuarios(resposta.data);
            })
            .catch(() => {
                setErro("Não foi possível carregar os usuários. Verifique se o back-end está rodando.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Carregando usuários...</p>;
    }

    if (erro) {
        return <p>{erro}</p>;
    }

    return (
        <ul>
            {usuarios.map((usuario) => (
                <UsuarioItem
                    key={usuario.id}
                    usuario={usuario}
                />
            ))}
        </ul>
    );
}

export default UsuarioList;