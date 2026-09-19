package br.ueg.trindade.projetoweb2fullstack.repository;

import br.ueg.trindade.projetoweb2fullstack.model.Permissao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissaoRepository extends JpaRepository<Permissao, Long> {
}