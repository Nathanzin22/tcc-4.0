const Product = require('./product');

describe('Product', () => {
  it('deve criar um novo produto com dados válidos', () => {
    const product = new Product('Produto de Exemplo', 'ABC123', 'exemplo@example.com', 'Software', '9876543210');

    expect(product.nome).toBe('Produto de Exemplo');
    expect(product.cpf).toBe('ABC123');
    expect(product.email).toBe('exemplo@example.com');
    expect(product.profissao).toBe('Software');
    expect(product.telefone).toBe('9876543210');
  });

  it('deve lançar um erro ao criar um novo produto sem nome', () => {
    expect(() => new Product('', 'DEF456', 'produto@example.com', 'Hardware', '5555555555')).toThrow('Nome é obrigatório');
  });

  it('deve lançar um erro ao criar um novo produto com CPF inválido', () => {
    expect(() => new Product('Produto de Exemplo', 'ABCD', 'exemplo@example.com', 'Software', '9876543210')).toThrow('CPF inválido');
  });

  it('deve lançar um erro ao criar um novo produto com email inválido', () => {
    expect(() => new Product('Produto de Exemplo', 'EFG789', 'exemplo', 'Software', '9876543210')).toThrow
    
});


});