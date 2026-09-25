package br.ueg.trindade.projetoweb2fullstack.repository;

import br.ueg.trindade.projetoweb2fullstack.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

}