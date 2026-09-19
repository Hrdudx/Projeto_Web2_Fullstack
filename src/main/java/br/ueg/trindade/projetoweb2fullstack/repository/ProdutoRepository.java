package br.ueg.trindade.projetoweb2fullstack.repository;

import br.ueg.trindade.projetoweb2fullstack.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
