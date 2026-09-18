package br.ueg.trindade.artifact.Web_2_fullstack.Controller;

import br.ueg.trindade.artifact.Web_2_fullstack.model.Permissao;
import br.ueg.trindade.artifact.Web_2_fullstack.repository.PermissaoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PermissaoController {

    @Autowired
    private PermissaoRepository permissaoRepository;

    @GetMapping("/permissoes")
    public List<Permissao> getAllPermissoes() {
        return permissaoRepository.findAll();
    }

    @PostMapping("/permissoes")
    public Permissao createPermissao(@RequestBody Permissao permissao) {
        return permissaoRepository.save(permissao);
    }

    @GetMapping("/permissoes/{id}")
    public Permissao getPermissaoById(@PathVariable Long id) {
        return permissaoRepository.findById(id).orElse(null);
    }
}