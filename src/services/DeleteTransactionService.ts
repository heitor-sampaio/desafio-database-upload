import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepositoty = getCustomRepository(TransactionsRepository);

    await transactionsRepositoty.delete(id);
  }
}

export default DeleteTransactionService;
