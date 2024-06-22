import DeleteAccountUseCase from './delete.account.usecase';

const input = {
  id: '12313',
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn().mockResolvedValue({}),
    update: jest.fn(),
    create: jest.fn(),
  };
};
describe('Unit Test delete account use case', () => {
  it('should delete a account', async () => {
    const accountRepository = MockRepository();
    const accountdeleteUseCase = new DeleteAccountUseCase(accountRepository);

    const output = await accountdeleteUseCase.execute(input);

    expect(accountRepository.delete).toHaveBeenCalledWith(input.id);
    expect(output).toEqual({
      message: 'Account successfully deleted',
    });
  });

  it('should thrown an error when account is not delete', async () => {
    const accountRepository = MockRepository();
    const accountdeleteUseCase = new DeleteAccountUseCase(accountRepository);

    input.id = '';

    await expect(accountdeleteUseCase.execute(input)).rejects.toThrow(
      'Id is required'
    );
  });
});
