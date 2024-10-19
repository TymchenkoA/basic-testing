// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi  } from './index'; 

jest.mock('axios');

describe('throttledGetDataFromApi', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers(); 
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    const mockCreate = axios.create as jest.Mock;
    mockCreate.mockReturnValue({ get: mockGet });

    await throttledGetDataFromApi('/guide');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // const mockGet = jest.fn().mockResolvedValue({ data: {} });
    // (axios.create as jest.Mock).mockReturnValue({ get: mockGet });

    // const relativePath = '/guide';
 
    // throttledGetDataFromApi(relativePath);
    // jest.advanceTimersByTime(5000);
    // await Promise.resolve();
    
    // expect(mockGet).toHaveBeenCalledWith(relativePath);

  });

  test('should return response data', async () => {
  //   const mockData = { name: 'Bob' };
  //   const mockGet = jest.fn().mockResolvedValue({ data: mockData });
  //   (axios.create as jest.Mock).mockReturnValue({ get: mockGet });

  //   const relativePath = '/guide';

  //   const result = await throttledGetDataFromApi(relativePath);

  //   jest.advanceTimersByTime(5000);
  //   await Promise.resolve();

  //   expect(result).toEqual(mockData); 
  });
});
