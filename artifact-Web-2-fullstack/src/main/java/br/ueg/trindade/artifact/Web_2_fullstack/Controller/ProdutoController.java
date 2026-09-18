package br.ueg.trindade.artifact.Web_2_fullstack.Controller;

import br.ueg.trindade.artifact.Web_2_fullstack.model.Produto;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ProdutoController {

    @GetMapping("/produtos")
    public List<Produto> getProdutos() {

        List<Produto> produtos = new ArrayList<>();

        Produto produto1 = new Produto();
        produto1.setId(1L);
        produto1.setNome("Café Expresso");
        produto1.setDescricao("Café expresso tradicional");
        produto1.setPreco(5.00);

        Produto produto2 = new Produto();
        produto2.setId(2L);
        produto2.setNome("Cappuccino");
        produto2.setDescricao("Cappuccino cremoso");
        produto2.setPreco(8.50);

        produtos.add(produto1);
        produtos.add(produto2);

        return produtos;
    }
}