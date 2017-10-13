export class Categoria {
    codigo: number;
    descricao: string;
}

export class Endereco {
    logradouro: string;
    numero: number;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
}

export class Pessoa {
    codigo: number;
    ativo = true;
    nome: string;
    endereco = new Endereco();
}

export class Lancamento {
    codigo: number;
    tipo = 'RECEITA';
    descricao: string;
    dataVencimento: Date;
    dataPagamento: Date;
    valor: number;
    observacao: string;
    pessoa = new Pessoa();
    categoria = new Categoria();
}
