// Uncomment the code below and write your tests
import { getBankAccount } from '.';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(100)).toMatchObject({_balance: 100});
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);
    expect(() => account.withdraw(120)).toThrow(`Insufficient funds: cannot withdraw more than 100`);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(50);
    expect(() => account1.transfer(1200, account2)).toThrow(`Insufficient funds: cannot withdraw more than 100`);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(70, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(70);
    expect(account.getBalance()).toBe(170);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(70);
    expect(account.getBalance()).toBe(30);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(50);
    account1.transfer(60, account2);

    expect(account1.getBalance()).toBe(40);
    expect(account2.getBalance()).toBe(110);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    (random as jest.Mock).mockReturnValueOnce(50).mockReturnValueOnce(1);
    const balance = await account.fetchBalance();
    expect(balance).toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(80);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(80);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(() => account.synchronizeBalance()).rejects.toThrow('Synchronization failed');
  });
});
