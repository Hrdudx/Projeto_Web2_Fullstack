package br.ueg.trindade.projetoweb2fullstack.repository;

import br.ueg.trindade.projetoweb2fullstack.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Long id);
}
