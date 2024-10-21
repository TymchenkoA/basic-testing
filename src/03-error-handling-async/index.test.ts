// Uncomment the code below and write your tests
import { throwCustomError, throwError, resolveValue, MyAwesomeError, rejectCustomError} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const data = await resolveValue('Hi there');
    expect(data).toBe('Hi there');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'Operation failed';
    expect(() => throwError(msg)).toThrow(msg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const customError = new MyAwesomeError();
    expect(() => throwCustomError()).toThrow(customError);
  });

  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });

  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow('This is my awesome custom error!');
  });
});
