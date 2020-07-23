import { getRepository, getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('Invalid transaction type.');
    }

    const categoriesRepository = getRepository(Category);

    let transactionCategory = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!transactionCategory) {
      transactionCategory = categoriesRepository.create({ title: category });

      await categoriesRepository.save(transactionCategory);
    }

    const transactionsRepositoty = getCustomRepository(TransactionsRepository);

    const { total } = await transactionsRepositoty.getBalance();

    if (type === 'outcome' && value > total) {
      throw new AppError('Insuficient resources.');
    }

    const transaction = transactionsRepositoty.create({
      title,
      value,
      type,
      category: transactionCategory,
    });

    await transactionsRepositoty.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
