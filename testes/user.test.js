const User = require('./user');

describe('User', () => {
  it('deve criar um novo usuário com dados válidos', () => {
    const user = new User('Fulano de Tal', '12345678901', 'fulano@example.com', 'Desenvolvedor', '1234567890');

    expect(user.nome).toBe('Fulano de Tal');
    expect(user.cpf).toBe('12345678901');
    expect(user.email).toBe('fulano@example.com');
    expect(user.profissao).toBe('Desenvolvedor');
    expect(user.telefone).toBe('1234567890');
  });

  it('deve lançar um erro ao criar um novo usuário com CPF inválido', () => {
    expect(() => new User('Beltrano de Tal', '12345', 'beltrano@example.com', 'Designer', '9876543210')).toThrow('CPF inválido');
  });

  it('deve lançar um erro ao criar um novo usuário sem nome', () => {
    expect(() => new User('', '12345678901', 'fulano@example.com', 'Desenvolvedor', '1234567890')).toThrow('Nome é obrigatório');
  });

  it('deve lançar um erro ao criar um novo usuário com email inválido', () => {
    expect(() => new User('Fulano de Tal', '12345678901', 'fulano', 'Desenvolvedor', '1234567890')).toThrow('Email inválido');
  });

  
});
