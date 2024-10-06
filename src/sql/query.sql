CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(100)
);

CREATE TABLE endereco (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES cliente(id),
    numero_da_casa VARCHAR(10),
    complemento VARCHAR(50),
    bairro VARCHAR(50),
    cidade VARCHAR(50),
    UF CHAR(2),
    CEP VARCHAR(15)
);

CREATE TABLE produto (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    descricao TEXT,
    preco NUMERIC(10, 2),
    quantidade INTEGER
);

CREATE TABLE carrinho (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES cliente(id),
    valor_total NUMERIC(10, 2) DEFAULT 0
);
CREATE TABLE carrinho_produto (
    carrinho_id INTEGER REFERENCES carrinho(id),
    produto_id INTEGER REFERENCES produto(id),
    quantidade INTEGER DEFAULT 1,
    PRIMARY KEY (carrinho_id, produto_id)
);
CREATE TABLE pagamento (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES cliente(id),
    carrinho_id INTEGER REFERENCES carrinho(id),
    data_pagamento TIMESTAMP,
    metodo_pagamento VARCHAR(50),
    valor_total NUMERIC(10, 2)
);

CREATE OR REPLACE FUNCTION atualizar_valor_total_carrinho()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE carrinho
    SET valor_total = (
        SELECT COALESCE(SUM(p.preco * cp.quantidade), 0)
        FROM carrinho_produto cp
        JOIN produto p ON p.id = cp.produto_id
        WHERE cp.carrinho_id = NEW.carrinho_id
    )
    WHERE id = NEW.carrinho_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_atualizar_valor_total
AFTER INSERT OR UPDATE OR DELETE ON carrinho_produto
FOR EACH ROW
EXECUTE FUNCTION atualizar_valor_total_carrinho();
