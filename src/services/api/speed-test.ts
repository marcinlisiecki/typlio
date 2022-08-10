import { AxiosResponse } from 'axios';
import api from 'lib/api';

interface INewSpeedTest {
  time: number;
  cpm: number;
  accuracy: number;
  mistakes: number;
  mode: string;
}

export const SpeedTestService = {
  Save: (data: INewSpeedTest): Promise<AxiosResponse> => api.post('/me/speed-tests', { ...data }),
};
