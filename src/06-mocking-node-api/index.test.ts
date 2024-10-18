// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import * as fs from 'fs'; 
import { readFile } from 'fs/promises'; 
import * as path from 'path'; 

jest.mock('fs');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
    
    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 2000;

    doStuffByTimeout(callback, timeout);

    jest.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(setIntervalSpy).toHaveBeenCalledWith(callback, interval);
    
    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  const mockedFs = jest.mocked(fs);
  const mockedPath = jest.mocked(path);

  test('should call join with pathToFile', async () => {
    const mockPathToFile = 'text.txt';
    await readFileAsynchronously(mockPathToFile);
    expect(mockedPath.join).toHaveBeenCalledWith(expect.any(String), mockPathToFile);
  });

  test('should return null if file does not exist', async () => {
    const mockPathToFile = 'text.txt';
    mockedFs.existsSync.mockReturnValue(false);
    const result = await readFileAsynchronously(mockPathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockPathToFile = 'test.txt';
    const mockContent = 'Hello, world!';

    mockedFs.existsSync.mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(mockContent));

    const result = await readFileAsynchronously(mockPathToFile);

    expect(result).toBe(mockContent);
  });
});
