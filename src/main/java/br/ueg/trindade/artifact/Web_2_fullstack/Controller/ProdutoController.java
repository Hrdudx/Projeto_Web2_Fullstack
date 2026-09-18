package br.ueg.trindade.artifact.Web_2_fullstack.Controller;

import br.ueg.trindade.artifact.Web_2_fullstack.model.Produto;
import br.ueg.trindade.artifact.Web_2_fullstack.repository.ProdutoRepository;

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
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping("/produtos")
    public List<Produto> getProdutos() {
        return produtoRepository.findAll();
    }

    @GetMapping("/produtos/{id}")
    public Produto getProdutoById(@PathVariable Long id) {
        return produtoRepository.findById(id).orElse(null);
    }

    @PostMapping("/produtos")
    public Produto createProduto(@RequestBody Produto produto) {
        return produtoRepository.save(produto);
    }
}
